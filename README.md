
<!-- 
[![Build Status](https://travis-ci.org/pixlsus/website.svg?branch=master)](https://travis-ci.org/pixlsus/website) 
-->


<img src='/static/images/logo/pixls-atom.png' width='400'>

PIXLS.US Website
================

Yep, here it is.  Finally!

**This is the Hugo migration for the old metalsmith website.**

Writing
-------
So you'd like to write some content for the site?  Awesome!

All of our files are written in [Markdown][] and are usually self-contained in a single directory for convenience.

I have started a guide to writing for the site that includes how to setup a preview environment easily and various small details about including images, videos, and more to be consistent with the site style and responsiveness.  You can find those details in the [WRITING.md][] file.

[Markdown]: https://daringfireball.net/projects/markdown/basics
[WRITING.md]: ./WRITING.md



Building
--------


### Requirements

The site is built using a static site generator, [hugo][].

[hugo]: https://gohugo.io/

To build the site, you'll need the [hugo][] binary, extended version:

https://gohugo.io/getting-started/quick-start/#step-1-install-hugo

We're currently using:

    hugo v0.93.0-07469082+extended

Once you've got hugo, you can clone the site:

    git clone --branch hugo https://github.com/pixlsus/website.git

(We're cloning the `hugo` branch specifically.)

### Building the Site

You'll also need to fetch @paperdigits fabulous `hugo-bootstrap-bare` theme
that we use as a basis for almost all of our work these days:

    git clone -b bootstrap5 --single-branch git@gitlab.com:pixlsus/hugo-bootstrap-bare.git themes/hugo-bootstrap-bare

Once done, the site can be built locally with:

    $ hugo

This will output all of the site files into a directory, `public/`.

Hugo has a built-in webserver:

    $ hugo server

You can then see it in a browser: `localhost:1313`.

