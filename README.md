
PIXLS.US Website
================

Yep, here it is.  Finally.


Requirements
------------
The site is built using a static site generator, [metalsmith][].
To build the site, you'll need:

* [Node.js][]
    Currently, `node --version` shows: `v0.10.30`.  
    Someone should probably update and test the site build against a newer version...
    * `npm --version` is `1.4.21`
* [metalsmith][]


[metalsmith]: http://www.metalsmith.io
[Node.js]: https://nodejs.org

Once Node.js is installed, you can automatically install all of the requirements with:

`npm install`



Building the Site
-----------------
Once the requirements are installed, the site can be built locally with:

`node index.js`

This will output all of the site files into a directory, `build/`.
