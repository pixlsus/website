---
date: 2015-12-24T21:56:56-05:00

title: darktable 2.0
sub-title: An awesome present for the end of 2015!

lede-img: Lying in Ambush.jpg
lede-img-thumb: th_Lying in Ambush.jpg
lede-style: ""
lede-attribution: "<a href='https://www.flickr.com/photos/80225884@N06/23867592615'>Lying in Ambush</a> by <a href='https://www.flickr.com/photos/80225884@N06/'>Jonas Wagner</a> <span class='cc'><a href='https://creativecommons.org/licenses/by/2.0/'>cb</a></span>"

author: 'Pat David'
author-img: ''
author-url: 'http://blog.patdavid.net'
author-twitter: ""
author-gplus: ""
author-fb: ""
author-bio: "I <a href='http://blog.patdavid.net'>write</a> things.<br>I <a href='http://www.flickr.com/photos/patdavid'>photograph</a> things.<br>Sometimes they <a href='//pixls.us'>meet</a>."

collection: blogposts 
layout: blog-posts.hbt
---

<style>
li {  margin-bottom: 0.25rem; }
ul + h3 { margin-top: 1.5rem; }
</style>

Sneaking a release out on Christmas Eve, the [darktable][] team have announced their feature release of [darktable 2.0][]!
After quite a few months of Release Candidates the 2.0 is finally here.
Please join me in saying _**Congratulations**_ and a hearty _**Thank You!**_ for all of their work bringing this release to us.

[darktable]: https://www.darktable.org
[darktable 2.0]: https://www.darktable.org/2015/12/darktable-2-0-released/

<!-- more -->

Alex Prokoudine of [Libre Graphics World][] has a more [in-depth look at the release][] including a nice interview with part of the team: Johannes Hanika, Tobias Ellinghaus, Roman Lebedev, and Jeremy Rosen.  My favorite tidbit from the interview:

> There is a lot less planning involved than many might think.
> <div style="text-align: right; font-size: 0.85rem;">&mdash; Tobias Ellinghaus</div>

[Libre Graphics World]: http://libregraphicsworld.org
[in-depth look at the release]: http://libregraphicsworld.org/blog/entry/darktable-2-0-released-with-printing-support

[Robert Hutton][] has taken the time to produce a [video covering the new features][] and other changes between 1.6 and 2.0 as well:

[Robert Hutton]: https://www.roberthutton.net/
[video covering the new features]: https://www.youtube.com/watch?v=VJbJ0btlui0

<div class='fluid-vid'>
<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/VJbJ0btlui0" frameborder="0" allowfullscreen></iframe>
</div>

A high-level look at the changes and improvements from the [release post on the darktable site][darktable 2.0]:

### gui:

* darktable has been ported to gtk-3.0
* the viewport in darkroom mode is now dynamically sized, you specify the border width
* side panels now default to a width of 350px in dt 2.0 instead of 300px in dt 1.6
* further hidpi enhancements
* navigating lighttable with arrow keys and space/enter
* brush size/hardness/opacity have key accels
* allow adding tone- and basecurve nodes with ctrl-click
* the facebook login procedure is a little different now
* image information now supports gps altitude


### features:

* new print mode
* reworked screen color management (softproof, gamut check etc.)
* delete/trash feature
* pdf export
* export can upscale
* new "mode" parameter in the export panel to fine tune application of styles upon export


### core improvements:

* new thumbnail cache replaces mipmap cache (much improved speed, stability and seamless support for even up to 4K/5K screens)
* all thumbnails are now properly fully color-managed
* it is now possible to generate thumbnails for all images in the library using new darktable-generate-cache tool
* we no longer drop history entries above the selected one when leaving darkroom mode or switching images
* high quality export now downsamples before watermark and framing to guarantee consistent results
* optimizations to loading jpeg's when using libjpeg-turbo with its custom features
* asynchronous camera and printer detection, prevents deadlocks in some cases
* noiseprofiles are in external JSON file now
* aspect ratios for crop&amp;rotate can be added to config file


### image operations:

* color reconstruction module
* magic lantern-style deflicker was added to the exposure module (extremely useful for timelapses)
* text watermarks
* shadows&amp;highlights: add option for white point adjustment
* more proper Kelvin temperature, fine-tuning preset interpolation in white balance iop
* monochrome raw demosaicing (for cameras with color filter array physically removed)
* raw black/white point module


### packaging:

* removed dependency on libraw
* removed dependency on libsquish (solves patent issues as a side effect)
* unbundled pugixml, osm-gps-map and colord-gtk


### generic:

* 32-bit support is soft-deprecated due to limited virtual address space
* support for building with gcc earlier than 4.8 is soft-deprecated
* numerous memory leaks were exterminated
* overall stability enhancements


### scripting:

* lua scripts can now add UI elements to the lighttable view (buttons, sliders etc...)
* a new repository for external lua scripts was started: https://github.com/darktable-org/lua-scripts
* it is now possible to edit the collection filters via lua
* it is now possible to add new cropping guides via lua
* it is now possible to run background tasks in lua
* a lua event is generated when the mouse under the cursor changes

The source is [available now][] as well as a .dmg for OS X.  
Various Linux distro builds are either already available or will be soon!

[available now]: https://www.darktable.org/install/
