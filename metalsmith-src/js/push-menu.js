/*
 * When clicking the nav toggle
 * add class 'animating' to body
 * add right/left class as needed
 * when transition ends,
 * remove 'animating left right' class
 * and add menu-visible
 */

var bar = document.getElementById('bar');

function transitionEndEventName () {
    var i,
        undefined,
        el = document.createElement('div'),
        transitions = {
            'transition':'transitionend',
            'OTransition':'otransitionend',  // oTransitionEnd in very old Opera
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        };

    for (i in transitions) {
        if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
            return transitions[i];
        }
    }

    //TODO: throw 'TransitionEnd event is not supported in this browser'; 
}

var toggle = function(e){
    e.preventDefault();

    var page = document.getElementById('pushPage');
    var menu = document.getElementById('pushMenu');
    var bar = document.getElementById('bar');

    transitionEnd = 'transitionend webkitTransitionEnd otransitionend MSTransitionEnd';

    page.className += ' animating';
    bar.className += ' animating';

    if( page.className.indexOf('menu-visible') !== -1 ){
        page.className += " right";
        bar.className += " right";
    }else{
        page.className += " left";
        bar.className += " left";
        //make the pushMenu visible before animating
        menu.className += "visible";
    }

    
}

var page = document.getElementById('pushPage');
var menu = document.getElementById('pushMenu');
var transitionEnd = transitionEndEventName();

page.addEventListener(transitionEnd, function(){
        page.className = page.className.replace(' animating', '');
        page.className = page.className.replace(' left', '');
        page.className = page.className.replace(' right', '');
        bar.className = bar.className.replace(' animating', '');
        bar.className = bar.className.replace(' left', '');
        bar.className = bar.className.replace(' right', '');

        if( page.className.indexOf('menu-visible') === -1 ){
            page.className += ' menu-visible';
            bar.className += ' menu-visible';
            page.addEventListener('click', toggle, false);
            page.addEventListener('touchstart', toggle, false);
        }else{
            page.className = page.className.replace(' menu-visible' , '');
            bar.className = bar.className.replace(' menu-visible', '');
            //hide the pushMenu again after animating closed
            menu.className = '';
            page.removeEventListener('click', toggle, false);
            page.removeEventListener('touchstart', toggle, false);
        }
    }, false);

bar.addEventListener("touchstart", toggle, false);
bar.addEventListener("click", toggle, false);

bar.addEventListener("click", progress, false);
bar.addEventListener("touchstart", progress, false);

/*
 * Add a TOC to the push menu
 */

function getElementsByTagNames(list,obj) {
	if (!obj) var obj = document;
	var tagNames = list.split(',');
	var resultArray = new Array();
	for (var i=0;i<tagNames.length;i++) {
		var tags = obj.getElementsByTagName(tagNames[i]);
		for (var j=0;j<tags.length;j++) {
			resultArray.push(tags[j]);
		}
	}
	var testNode = resultArray[0];
	if (!testNode) return [];
	if (testNode.sourceIndex) {
		resultArray.sort(function (a,b) {
				return a.sourceIndex - b.sourceIndex;
		});
	}
	else if (testNode.compareDocumentPosition) {
		resultArray.sort(function (a,b) {
				return 3 - (a.compareDocumentPosition(b) & 6);
		});
	}
	return resultArray;
}

var toclist = getElementsByTagNames('h1,h2,h3,h4,h5');
//console.log( toclist );
//

function endsWith( str, suffix ){
    return str.indexOf( suffix, str.length - suffix.length) !== -1;
}

if( toclist.length > 0 ){
    var mm = document.getElementById('pushMenu');
    var m = document.getElementById('pushMenu-TOC');
    var t = document.createElement('div');
    /*
    t.innerHTML = 'Contents';
    t.className = 'push-contents';
    //m.appendChild( t );
    mm.insertBefore( t, m );
    */
    
    for( var i = 0; i < toclist.length; i++ ){
        var l = document.createElement('div');
        l.className = 'toc';
        switch( toclist[i].nodeName ){
            case 'H1':
                l.className += ' first';
                break;
            case 'H2':
                l.className += ' second';
                break;
            case 'H3':
                l.className += ' third';
                break;
            case 'H4':
                l.className += ' fourth';
                break;
            case 'H5':
                l.className += ' fifth';
                break;
        }

        var a = document.createElement('a');
        a.href = '#' + toclist[i].id;
        //a.innerHTML = toclist[i].innerHTML;
        a.innerHTML = toclist[i].textContent || toclist[i].innerText;
        l.id = 'toc-' + toclist[i].id;
        l.appendChild( a );

        // This added a hover link for each heading in the body
        //toclist[i].insertAdjacentHTML( "beforeEnd", "<a href='#"+ toclist[i].id +"' class='header-link'><i class='fa fa-link'></i></a>");


        var t_progress = document.createElement('div');
        t_progress.className = 'toc-progress';
        l.appendChild( t_progress );

        if( window.location.pathname !== '/' && 
                window.location.pathname !== '/articles/' && 
                window.location.pathname !== '/software/' ){

                    t.innerHTML = 'Contents';
                    t.className = 'push-contents';
                    mm.insertBefore( t, m );

                    m.appendChild( l );
        }

    }
}

function progress(e){
    var height = document.documentElement.clientHeight;
    for( var i = 0; i < toclist.length - 1; i++ ){
        //console.log( toclist[i].id +" : "+ toclist[i].getBoundingClientRect().bottom );
        var bottom = toclist[i].getBoundingClientRect().bottom;
        var bottom_next = toclist[i+1].getBoundingClientRect().bottom;
        var tocid = "toc-" + toclist[i].id;
        //if( bottom < 0 ){
        //    var tocid = "toc-" + toclist[i].id;
        //    document.getElementById( tocid ).getElementsByClassName('toc-progress')[0].style.width = '100%';
        //}
        if( bottom_next < (height/2) ){
            document.getElementById( tocid ).getElementsByClassName('toc-progress')[0].style.width = '100%';
        }
        else if ( bottom < (height/2) ){
            var Htot = bottom_next - bottom;
            var Hc = (height/2) - bottom;
            //console.log("Htot: "+ Htot +" Hc: "+ Hc);
            //console.log("Hc/Htot: "+ Hc/Htot);
            document.getElementById( tocid ).getElementsByClassName('toc-progress')[0].style.width = ((Hc/Htot) * 100) + '%';
        }else{
            document.getElementById( tocid ).getElementsByClassName('toc-progress')[0].style.width = '0';
        }
    }
}
