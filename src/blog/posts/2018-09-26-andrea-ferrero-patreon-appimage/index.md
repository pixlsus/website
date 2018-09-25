---
date: 2018-09-26T10:22:32-08:00
title: Support Andrea Ferrero on Patreon!
sub-title: Andrea is developing Photo Flow, GIMP AppImage, Hugin AppImage, and more!

lede-img: "af-lede.jpg"
lede-img-thumb: "af-lede.jpg"
lede-attribution: "Andrea Ferrero"

author: Mica
author-url: 'https://silentumbrella.com'
author-img: '/images/authors/paperdigits.png'
author-bio: 'Editor of many, many things.'

collection: blogposts
layout: blog-posts.hbt

---

Andrea Ferrero, or as we know him [Carmel_DrRaw](https://discuss.pixls.us/u/carmelo_drraw/summary) has been contributing to the PIXLS.US community since April of 2015. A self described *developer and photography enthusiast*, Andrea is the developer of the [PhotoFlow](https://github.com/aferrero2707/PhotoFlow) image editor, and is producing AppImages for:
<ul>
<li>The <a href="https://www.gimp.org/">GIMP</a> image manipulation program - weekly <a href="https://github.com/aferrero2707/gimp-appimage/releases/tag/continuous">AppImage packages</a> from stable releases and development branches.</li>
<li>The <a href="https://rawtherapee.com/">RawTherapee</a> editor - nightly <a href="https://github.com/Beep6581/RawTherapee/releases/tag/nightly">AppImage</a> and&nbsp;<a href="https://github.com/aferrero2707/rt-win64/releases/tag/continuous">Windows</a> packages from stable and development branches</li>
<li><a href="http://qtpfsgui.sourceforge.net/">LuminanceHDR</a> - nightly&nbsp;<a href="https://github.com/aferrero2707/lhdr-appimage/releases/tag/continuous">AppImage</a> packages for Linux</li>
<li><a href="http://jcelaya.github.io/hdrmerge/">HDRMerge</a> -&nbsp;nightly <a href="https://github.com/jcelaya/hdrmerge/releases/tag/nightly">AppImage</a> packages for Linux</li>
<li>The <a href="http://hugin.sourceforge.net/">Hugin</a> panorama photo stitcher -&nbsp;<a href="https://gist.github.com/aferrero2707/d676fea46f3d91fcd4c7fb7b2c83a885">AppImages</a> for stable releases and development branches</li>
</ul>

Andrea is the best sort of community member, contributing six different projects (including his own)! He is always thoughtful in his responses, does his own support for PhotoFlow, and is kind and giving. He has finally started a [Patreon page to support his all of his hard work](https://www.patreon.com/andreaferrero/overview). Support him now!

He was also kind enough to answer a few questions for us:

PX: **When did you get into photography? What’s your favorite subject matter?**

AF: I think I was about 15 when I got my first reflex, and I have been immediately fascinated by macro-photography. This is still what I like to do the most, together with taking pictures of my kids ;-)
By the way, you can visit my personal free web gallery on GitHub: http://aferrero2707.github.io/photorama/gallery/ (adapted from [this project](https://github.com/sunbliss/photorama)).
It is still work in progress, but you are welcome to fork it and adapt it to your needs if you find it useful!

PX: **What brought you to using and developing Free/Open Source Software?**

AF: I started to get interested in programming when I was at the university, in the late 90's. At that time I quickly realized that the easiest way to write and compile my code was to throw Linux into my hard drive. Things were not as easy as today, but I eventually managed to get it running, and the adventure began.

A bit later I started a scientific career (nothing related to image processing or photography, so I will not give more details about my daily job), and since then I have been a user of Linux-based computing clusters for almost 20 years at the time of writing... A large majority of the software tools I use at work are free and open sourced, and this definitely has marked my way of thinking and developing.

PX: **What are some new/exciting features you develop in Photo Flow?**

AF: Currently I am mostly focusing on HDR processing and high-quality Dynamic Range compression - what is also commonly called shadows/highlights compression.

More generally, there is still a lot of work to do on the performances side. The software is already usable and quite stable, but some of the image filters are still a bit too slow for real-time feedback, especially when combined together.

The image exporting module is also currently in a state of work in progress. It is already possible to select either Jpeg or TIFF (8, 16 or floating-point 32 bits bit depth) as the output format, to resize the image and add some post-resize sharpening, and to select the output ICC profile.
What is still missing is a real-time preview of the final result, with a possibility to soft-proof the output profile. The same options need to be included in the batch processor as well.

On a longer term, and if there is some interest from the community, I am thinking about porting to code to Android, in a simplified form that would be suitable for tablets and the like. The small memory footprint of the program could be an important advantage on such systems.

PX: **What other applications would you like to make an AppImage for? Have you explored Snaps or Flatpaks?**

AF: I am currently developing and refining AppImage packages for GIMP, RawTherapee, LuminanceHDR and HDRMerge, in addition to PhotoFlow. All packages are automatically built and deployed through Travis CI, for better reproducibility and increased security. Hugin is the next application that I plan to package as an AppImage.

All the AppImage projects are freely available on GitHub. That's also the best place for any feedback, bug report, or suggestion.

There is an ongoing [discussion](https://github.com/aferrero2707/gimp-appimage/issues/9) with the GIMP developers about the possibility to provide the AppImage as an official download.

In addition to the AppImage packages, I am also working with the RawTherapee developers on cross-compiled Windows packages that are also automatically built on Travis CI. The goal is to help them provide up-to-date packages from the main development branches, so that more users can test them and provide feedback.

I'm also open to any suggestions for additional programs that could be packaged as AppImages, so do not hesitate to express your wishes!

Personally I am a big fan of the AppImage idea, mostly because, unlike Snap or Flatpack packages, it is not bound to any specific distribution or run-time environment. The packager has full control over the contents of the AppImage package, pretty much like MacOS bundles.
Moreover, I find the community of developers around the AppImage format very active and open-minded. I am currently collaborating to improve the packaging of GTK applications. For those who are interested in the details, the discussion can be followed here: https://github.com/linuxdeploy/linuxdeploy/issues/2
