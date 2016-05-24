---
date: 2014-09-2T11:49:28-05:00
title: "Building PIXLS.US" 
sub-title: "A journey of enlightenment..."
author: "Pat David" 
author-img: ""
#author-email: "pat@patdavid.net"
author-url: "http://blog.patdavid.net"
author-bio: "This is a big long bio about me for some reason.  I'm testing out <a href='http://blog.patdavid.net'>aanchor link</a> in this string"
lede-img: "dot-open-eyes.jpg"
lede-attribution: "Dot Eyes Open by Pat David"
tags:
    - build
    - log
    - reference
layout: article.hbt
---

This is just a log of reference material for actually building this site.  It's mostly for my own reference and edification.  If you're reading this, good luck making sense of my notes...

### Static Website with Node.js and Metalsmith

I decided to build this site as a static website.  This means that I'm generating all of the material on my local machines, and then compiling them into static webpages that are then uploaded to the server for serving.  While this does sound like a pain in the ass, there are static site generators that make this job much easier.

So I looked around a bit more and found that apparently static site generators are the hip new thing.

I originally started with http://nanoc.ws/.  While this was pretty interesting looking, I am just not a Ruby guy.  So I had the double-whammy of learning the static build system along with Ruby occasionally.  Plus, after a host of problems getting the correct ruby and gems installed on my OSX machine I just decided it wasn't worth the hassle. (I have to switch between win at work, and OSX/Linux at home - so I needed a consistent environment).

I expanded my search and finally remembered [Node.js](http://nodejs.org/).  Looking around a bit more and I also found a static site generator for Node.js called [Metalsmith](http://www.metalsmith.io).
This was good, as I was already reasonably familiar with javascript.

Metalsmith basically just takes a directory of files, and passes them into a javascript environment for processing and output to a new directory, ready to be uploaded to a server.
This is how this page is being generated right now as well.

#### Installing the Build Tools

The first thing to do is to get Node.js for your platform.  Once installed, you'll have access to the commands `node` as well as `npm` (node package manager?).
Installing Metalsmith from there is as simple as:

`node install metalsmith`

Basically, Metalsmith just passes each of the directory contents through a stack of functions that you can use to process the files.  Many of these are available as plug-ins for Metalsmith.
For this site so far, I've been using these plug-ins:

* metalsmith-collections `npm install metalsmith-collections`
* metalsmith-permalinks `npm install metalsmith-permalinks`
* metalsmith-templates `metalsmith-templates`
* metalsmith-markdown `metalsmith-markdown`

For the templating option, I'm also using [Handlebars](http://handlebarsjs.com/).

There is a great tutorial on getting started with Metalsmith at [Robin Thrift's website](http://www.robinthrift.com/posts/metalsmith-part-1-setting-up-the-forge/).

#### Project Structure

The structure of this site is still in flux.
By default metalsmith will look for a folder in the project root called "src", and will output to a folder called "build".
The site structure I have setup for this site is:

<pre>
|-pixlsus/
	|-src/
		|-articles/
		|-images/
		|-js/
		|-pages/
		|-scripts/
		|_styles/
	|-templates/
	|-index.js
	|_package.json
</pre>

#### index.js

The main processing file for building the site is `index.js`.

```
var Metalsmith	= require('metalsmith'),
	collections	= require('metalsmith-collections'),
	permalinks	= require('metalsmith-permalinks'),
	templates	= require('metalsmith-templates'),
	markdown	= require('metalsmith-markdown'),
	metadata	= require('./config.json'),
	Handlebars	= require('handlebars');

Metalsmith(__dirname)
	.use(markdown({
		smartypants: true,
		gfm: true,
		tables: true
	}))
	.use(hyphenate_urls)
	.use(collections())
	.use(permalinks({
		pattern: ':collection/:title'
	}))
	.use(templates('handlebars'))
	.destination('./build')
	.build();
```

There are a couple of other things I am doing for the templating, and one custom function I wrote to automatically hyphenate url's. To avoid something like:

 `articles/a%20new%20article/`

I think this looks nicer: 

`articles/a-new-article/`

Honestly, if I was just testing things out, the bare minimum I could use to get by would be:

```
var Metalsmith	= require('metalsmith'),
	templates	 = require('metalsmith-templates'),
	Handlebars	= require('handlebars');

Metalsmith(__dirname)
	.use(templates('handlebars'))
	.destination('./build')
	.build();
```

If you have a base skeleton of a site, this would be all you need to run.

#### Building the Site
The site can be built by entering the site directory, and issuing the command `node index.js`.

Wait a few moments, and you should find a `build/` directory full of your files ready to go.

### Uploading
My host doesn't have rsync access directly, but I can use rsync over ssh:

```
rsync -PSauve ssh --exclude=EXCLUDE_FILES build/ USER@pixls.us:/home4/pixlsus/public_html/
```

Which works just fine.


## TODO
List of stuff I still need to get to:
- Test porting one of the 'Getting Around in GIMP' articles
    - Working on it.
- Port a few other test articles
- Use collections in Metalsmith to collect articles of a type
    - Generate a page of those.
- Probably a new index.html/front page.
- Work on "About" page
- Finish styling article pages.
    - ~~Particularly the links (Mobile is done? - Tablet is needed).~~

This list will grow, of course, as it needs to until we launch!

### Blog
I've started an article to represent blog posts on the site.
I intend for them to live at the path: `pixls.us/blog/YYYY/MM/title-of-post`

The problem is that I can't easily use `metalsmith-permalinks` for them.
There doesn't appear to be a way to easily process a sub-folder of documents with a different path.
I don't want the `articles` content to contain `YYYY/MM` in the path, but I **do** for blog posts.

So I think I'll just have to write a plugin to handle that myself real quick.
Shouldn't be too hard, just need to do something similar to what I already wrote for hyphenating urls.

Basically, grab all blog posts, update their paths to the hyphenated version and change the source file to `index.html` in the directory. **IF** the file is not already in a sub-directory.
