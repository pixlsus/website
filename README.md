
PIXLS.US Website
================

Yep, here it is.  Finally.



Requirements
------------
The site is built using a static site generator, [metalsmith][].

To build the site, you'll need:

* [Node.js][]  
    Currently,
    * `node --version` shows: `v4.4.4`.
    * `npm --version` is `2.15.1`  
* [The site](https://github.com/pixlsus/website)
    * `git clone https://github.com/pixlsus/website.git`


Once you've installed Node.js, you can clone the site, then use Node Package Manager
to install the rest of the dependencies:

    $ git clone https://github.com/pixlsus/website.git
    $ cd website
    $ npm install

This command should install all of the required dependencies for building the site.
If you want to see exactly what they all are, take a look inside the [package.json][] file.

There will likely be some warnings declared until I finish upgrading and testing packages.



Building the Site
-----------------
Once the requirements are installed, the site can be built locally with:

    $ node index.js

This will output all of the site files into a directory, `build/`.

If you don't have an http server ready to use, you can install one:

    $ npm install -g http-server

and then start it up to view the built site:

    $ http-server build/

You can then see it in a browser: `localhost:8080`.


[metalsmith]: http://www.metalsmith.io
[Node.js]: https://nodejs.org
[package.json]: https://github.com/pixlsus/website/blob/master/package.json
