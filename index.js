var Metalsmith  = require('metalsmith'),
    collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks'),
    //templates = require('metalsmith-templates'),
    layouts     = require('metalsmith-layouts'),
    //inPlace     = require('metalsmith-in-place'),
    markdown    = require('metalsmith-markdown'),
    branch      = require('metalsmith-branch'),
    more        = require('metalsmith-more'),
    path        = require('metalsmith-path'), /* Add 'path' property to each files metadata */
    paginate    = require('metalsmith-pagination'),
    //feed        = require('metalsmith-feed'),
    clean       = require('metalsmith-clean'),
    snippet     = require('metalsmith-snippet'),
    sass        = require('metalsmith-sass'),
    metadata    = require('./config.json'),
    Handlebars  = require('handlebars'),
    rmdir       = require('rimraf'),
    fs          = require('fs');

//
// Adding partial elements for templates
// Google Analytics Code
Handlebars.registerPartial('analytics', fs.readFileSync(__dirname + '/templates/partials/analytics.hbt').toString());

// Common footer
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());

// Push Menu (on the left)
Handlebars.registerPartial('push-menu', fs.readFileSync(__dirname + '/templates/partials/push-menu.hbt').toString());

// The top navigation 'px' icon
Handlebars.registerPartial('topnav', fs.readFileSync(__dirname + '/templates/partials/topnav.hbt').toString());

Handlebars.registerHelper('link', function(path) {
    return metadata.baseUrl + '/' + path;
})

Handlebars.registerHelper('lede-path', function(rss, lede) {
    // If lede doesn't start with 'http'
    // means that it's a local image, so change path appropriately
    //if( lede.indexOf('http') === -1 ){
    if( lede.indexOf('http') != 0 && lede.indexOf('/') != 0 ){
        // Then give it a path from the 'path' property
        if( rss == 'rss' ){
            lede = 'https://pixls.us/'+ this.path +'/'+ lede;
        }else if( lede.indexOf('/') === 0 ){
        }else{
            lede = '/'+ this.path +'/'+ lede;
        }
    }
    return lede;
})

Handlebars.registerHelper('toUTF8', function(obj) {
    return unescape( encodeURIComponent( obj ) );
})

/*
 * This only works on images right now
 */
Handlebars.registerHelper('abPath', function(obj) {
    var content = this.contents.toString();

    // First, let's get all img tags in the text...
    //
    // regex for grabbing 
    var rei = new RegExp("<img.*?[\/]*>", "g");
    
    // get all matches in an array
    var matches = content.match(rei);
    if ( matches !== null ){
        for(i = 0; i < matches.length; i++){
            var res = /src=['"](.*?)['"]/;
            var srcMatches = matches[i].match(res);
            if( srcMatches !== null && srcMatches[1].lastIndexOf("http", 0) !== 0 && srcMatches[1].lastIndexOf("/", 0) !== 0){
                var nlink = srcMatches.input.replace( srcMatches[1], '/'+ this.path +'/'+ srcMatches[1]);
                content = content.replace( srcMatches.input, nlink );
            }
        }
        //console.log( content );
        this.contents = new Buffer( content );
    }
})

Handlebars.registerHelper('abPathTest', function(obj, rss){

    var content = obj.toString();

    // the old regex is this one:
    //var re = /<img(.*?)src=['"](.*?)['"](.*?)>/gi;
    //
    // the regex below doesn't match any src=" that begins with 'http' or '/'

    if( rss == 'rss' ){

        //this replace directly below does just as advertised,
        // turning all relative links/src to full paths
        content = content.replace(/(src|href)=(['"])\//g, '$1=$2https://pixls.us/');

        var re2 = /<img(.*?)src=['"](?!http)(.*?)['"](.*?)>/gi;
        var m = content.match(re2);
        if( m !== null ){
            content = content.replace( re2, '<img$1src="https://pixls.us/'+this.path+'/$2"$3>' );
        }
    }else{

        var re = /<img(.*?)src=['"](?!http|\/)(.*?)['"](.*?)>/gi;
        var m = content.match(re);
        if( m !== null ){
            content = content.replace( re, '<img$1src="/'+this.path+'/$2"$3>' );
        }
    }

    return content;

})

Handlebars.registerHelper('debug', function(optionalValue){
    console.log( this );
})

Handlebars.registerHelper('rssDate', function(date){
    var currentDate = new Date(date);
    
    if( isNaN( currentDate.getTime() ) ){
        // Not valid date
        var d = new Date();
        return d.toUTCString();
    }else{
        // valid date
        return currentDate.toUTCString();
    }
})

Handlebars.registerHelper('niceDate', function(indate){
    //console.log(indate);
    var m = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var d = new Date(indate);
    var year = d.getFullYear();
    var month = m[d.getMonth()];
    var day = d.getDate();
    var ord = '';
    if ( day>3 && day<21){
        ord = 'th';
    }else{
        switch (day%10){
            case 1: ord = 'st';
                    break;
            case 2: ord = 'nd';
                    break;
            case 3: ord = 'rd';
                    break;
            default: ord = 'th';
        }
    }

    return( month +' '+ day +'<sup>'+ ord +'</sup>, '+ year );
});

/*
 * This helper will break up the contents input
 * based on the regex.  It will then create a new element
 * called "chunk" which is an array of those elements as objects
 */
Handlebars.registerHelper('chunkTest', function(context) {
    var chunkedArray = [];      // array to hold objects
    var re = /(<img.*?full-width.*?>)/; // regex to find fill-width images
    var chunked = this.contents.split(re); // split contents on regex
    if( chunked[0].length == 0 ){ chunked.shift(); } // remove first el if it's nothing

    for ( var i = 0; i < chunked.length; i++ ){
        if( chunked[i].match(re) == null ){
            chunkedArray[i] = { data: chunked[i] };
        }else{
            chunkedArray[i] = { image: chunked[i] };
        }
    }
    this.chunk = chunkedArray;
});

/*
 * Take the current content data
 * find if there's a "full-width" class in it
 * split data on that element (data, full-width, data.....)
 * return an array of those elements for processing
 */
Handlebars.registerHelper('chunk-full-width', function(context, options) {
        for(var i = 0; i < context.length; i++){
            console.log( options.fn( context[i] ) );
    }
});

Handlebars.registerHelper('chunk-pre', function(context, options){
    var re = /<!-- \/?FULL-WIDTH -->/g;
    var carray = [];
    this.chunks = context.split(re);
});

Handlebars.registerHelper('is_even', function(conditional, options) {
    if((conditional %2) == 0){
        return options.fn(this);
    }else{
        return options.inverse(this);
    }
});

// Limit function for pagination
Handlebars.registerHelper('limit', function(collection, limit, start) {
    var out = [],
        i, c;

    start = start || 0;

    for (i = c = 0; i < collection.length; i++) {
        if (i >= start && c < limit+1){
            out.push(collection[i]);
            c++;
        }
    }

    return out;
});

// each_upto, usage: {{#each_upto THING 5}} ... {{/each_upto}}
// from: http://stackoverflow.com/questions/10377700/limit-results-of-each-in-handlebars-js
Handlebars.registerHelper('each_upto', function(ary, max, options) {
    if(!ary || ary.length == 0)
        return options.inverse(this);

    var result = [ ];
    for(var i = 0; i < max && i < ary.length; ++i)
        result.push(options.fn(ary[i]));
    return result.join('');
});

// Trying a limit function as described in the above SO thread at the end...
// This works as described (a subexpression), and keeps indices working.
// invoke as part of each: {{ each (limited collection.stuff 5) }}
Handlebars.registerHelper('limited', function(arr, limit) {
    //if (!_.isArray(arr)){ return []; }
    return arr.slice(0, limit);
});


// Metalsmith test function
var dump = function(files, metalsmith, done){
    //console.log("## FILES ##");
    //console.log(files);
    //console.log("##################################################");
    //console.log(metalsmith.data.articles);
    //console.log("##################################################");
    //console.log( files );
    for( index in metalsmith.data.blogposts ){
        //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        //console.log(metalsmith.data.blogposts[index] );
        //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        
    }
    /*
    for( index in files ){
        console.log("Index: " + index);
    }   
    console.log( files['articles\\article-with-index\\index.html'] );
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    console.log( files['articles\\article-with-index\\index.html'].contents.toString() );
    var tmp = "This is a <em>strong</em> string of stuff to test buffer encoding to UTF-8";
    files['articles\\article-with-index\\index.html'].tmp = new Buffer(tmp);
    console.log( files['articles\\article-with-index\\index.html'] );
    console.log( files['articles\\article-with-index\\index.html'].tmp.toString() );
    */
    done();
}

// Metalsmith plugin
// add necessary markup to support hover links to heading sections in a page
// For each heading in the html file,
// replace <h2 id="id-stuff">ID Stuff</h2>, with
// <h2 id="id-stuff">ID Stuff<a href="#id-stuff" class="header-link"><i class="fa fa-link"></i></a></h2>
var header_links = function( files, metalsmith, done){
    Object.keys(files).forEach(function(file) {
        // for each file in the list
        //
        // if the file key ends in ".html", then do stuff to it
        if( file.indexOf( ".html", file.length - ".html".length) !== -1){
            var fileObject = files[file];
            var cont = fileObject.contents.toString();
            var re = /<h([23456]) id="(.*?)">(.*?)<\/h[23456]>/gi;

            // Testing fixing same-heading text issues
            if( file.indexOf('hdr-photography') > -1 ){
                var myArr;
                var idArr = new Array();
                var count = {};
                while( ( myArr = re.exec( cont )) !== null){
                    //console.log( "Found " + myArr[0] +" :: "+ myArr[2] +" :: "+ myArr.index );
                    if( idArr.indexOf( myArr[2] ) > -1 ){
                        //in array
                        count[ myArr[2] ]++;
                        var old = 'id="'+ myArr[2] +'"';
                        var newrep = 'id="'+ myArr[2] +'-'+ count[ myArr[2] ] +'"';

                        cont = cont.replace( old, newrep );
                    }else{
                        //not in array
                        idArr.push( myArr[2] );
                        count[ myArr[2] ] = 1;
                    }
                }
            }

            cont = cont.replace( re, '<h$1 id="$2">$3<a href="#$2" class="header-link"><i class="fa fa-link"></i></a></h$1>' );
            files[file].contents = new Buffer( cont );

        }
    });
    done();
}


// Metalsmith plugin (alternate)
// add necessary markup to support hover links to heading sections in a page
// For each heading in the html file,
// replace <h2 id="id-stuff">ID Stuff</h2>, with
// <h2 id="id-stuff"><a href="#id-stuff" class="header-link-alt">ID Stuff</a></h2>
var header_links_alt = function( files, metalsmith, done){
     Object.keys(files).forEach(function(file) {
        // for each file in the list
        //
        // if the file key ends in ".html", then do stuff to it
        if( file.indexOf( ".html", file.length - ".html".length) !== -1){
            var fileObject = files[file];
            var cont = fileObject.contents.toString();
            var re = /<h([23456]) id="(.*?)">(.*?)<\/h[23456]>/gi;
            cont = cont.replace( re, '<h$1 id="$2"><a href="#$2" class="header-link-alt">$3</a></h$1>' );
            files[file].contents = new Buffer( cont );

        }
    });
    done();
   
}


// simple script to replace spaces in url with hyphens (-)
// does _not_ change non-html filenames with hyphens
// and add a "path" variable to objects with its path.
//
var hyphenate_urls = function( files, metalsmith, done ){

    for (var file in files){
        
        var tmp;
        var tmp_path;
        var tmp_file;

        tmp = file.replace(/\\/g, "/"); // change all paths to forward slashes
        
        tmp_path = tmp.substring(0, tmp.lastIndexOf("/") + 1); // the path portion
        tmp_file = tmp.substring( tmp.lastIndexOf("/") + 1, tmp.length); // file portion

        tmp_path = tmp_path.replace(/ /g, "-"); // replace space with hyphen in path
        if( tmp_file.split(".").pop() == "html" ){ // if file is html, replace spaces
            tmp_file = tmp_file.replace(/ /g, "-");
        }

        tmp = tmp_path + tmp_file; // combine

        // If spaces in filename, replace
        if( tmp !== file ){
            //console.log( file );
            files[tmp] = files[file];
            delete files[file];
        }

        // Add "path" variable to object
        files[tmp].path = tmp;
    }
    done();
}


// 
// HERE WE GO!
//
Metalsmith(__dirname)
    .use(markdown({
        smartypants: true,
        gfm: true,
        tables: true
    }))
    .use(hyphenate_urls)
    .use(more())
    .use(snippet({
        maxLength: 500,
        stop: '<!-- more -->'
    }))
    .use(collections({
        articles: {
            // Using a pattern to capture _all_ articles
            pattern: 'articles/*/index.html',
            sortBy: 'date',
            reverse: true
        },
        blogposts: {
            //pattern: 'blog/posts/**/*.html',
            // using 'collections' metadata instead
            sortBy: 'date',
            reverse: true
        },
        tutorial: {
            sortBy: 'date',
            reverse: true
        },
        all: {
            // This pattern matches all articles and (hopefully) blog posts?
            pattern: "{articles/*/index.html,blog/posts/**/*.html}",
            sortBy: 'date',
            reverse: true,
            refer: false
        }
    }))
    /*
    .use( function( files ) {
        console.log( files );
    })
    */
    // process top-level html blog posts, and permalink
    .use( branch('blog/posts/*.html')
            .use( permalinks({
                pattern: 'blog/:date/:title',
                date: 'YYYY/MM',
                relative: false
                }))
            .use( header_links_alt )
    )
    // process folder nested blog posts, + assets hopefully...
    .use( branch('blog/posts/*/**')
            .use( permalinks({
                pattern: 'blog/:date/:title',
                date: 'YYYY/MM',
                }))
            .use( header_links_alt )
    )
    // process articles folder (nested) + assets?
    .use( branch('articles/*/**')
            .use( permalinks({
                    pattern: 'articles/:title',
                    }))
            .use( header_links )
    )
    // paginate blogposts collection
    .use(paginate({
        'collections.blogposts':{
            perPage: 10,
            //template: 'blog-list-pages.hbt',
            layout: 'blog-list-pages.hbt',
            first: 'blog/index.html',
            path: 'blog/page-:num.html',
            noPageOne: true,
            pageMetadata: {
                title: 'Blog'
            }
        }
    }))
    //.use(templates('handlebars'))
    .use( layouts({
        engine: 'handlebars',
        directory: 'templates'
    }))
    .use( sass({
        outputStyle: "expanded"
    }))
    .destination('./build')
    //.build();
    .build(function(err) {
        if (err) {
                console.log(err);
                throw err;
            }else{
                console.log("Built, now deleting /blog/posts directory");
                rmdir('./build/blog/posts', function(err){
                    if (err) {
                        console.log(err);
                        throw err;
                        }
                })
                console.log("Yes M'Lord!");
            }
    })

