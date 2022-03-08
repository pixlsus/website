---
#date: 2014-08-28
#date: 2014-08-24T19:40:00-05:00
date: 2014-09-02T09:35:51-05:00
title: "On Building PIXLS.US"
sub-title: "Some notes from the back end"
lede_img: "https://lh5.googleusercontent.com/-VScF_Hq-YE8/VAOA5mdIchI/AAAAAAAARYs/uj6xLzvyRiY/s0/pixls-background.jpg"
lede-style: "background-size: cover; background-repeat: no-repeat;"
author: "Pat David"
author_bio: "I write things.  I photograph things.  Sometimes they meet.  <br/>I <a href='http://blog.patdavid.net'>blog</a> about various things. I write <a href='http://blog.patdavid.net/p/getting-around-in-gimp.html'>tutorials</a> too."
collection: blogposts
layout: blog-posts.hbt
---

For the curious, and to serve as an introduction, I thought I'd make a few notes about how this site is built and what I'm currently obsessing over.
Hopefully this can help define what I'm up to in case anyone wants to jump in and help out.

## The Purpose 

The entire point of this site, its "mission statement" if you will, is:

> To provide tutorials, workflows and a showcase for high-quality photography using Free/Open Source Software.

Subject to revisions, of course, but mostly sums up what I'd like to accomplish here.
I also think it's good to have this documented somewhere to remind me. :)
<!--more-->
## The Technical

I had already started writing about this elsewhere, but I'm going to reiterate it here for posterity (when I wrote it earlier I hadn't completed the blog portion of the site yet).

### Static Pages

On the recommendation of <a href="http://nordisch.org/">darix</a> on the <small>#darktable</small> irc channel, I looked into static site generators. 
I was originally going to use some sort of CMS and build things out from there, but I have to thank darix for causing me to pause and to think carefully about how to proceed.

I realized that I wanted to keep things simple.
The main focus of the site is the articles themselves (a tutorial, workflow, or showcase).
Really, this content is static by nature - so it made sense to approach it in that light.

The idea is to have all of the site content exist locally on my machine, then to pass it through some sort of processor to output all of the website pages ready to upload to my server. I was already familiar with the process as the [GIMP](http://www.gimp.org) website is built in a similar fashion.

I just had to find a static site generator that I could use and extend as needed.

#### Enter Metalsmith
There is a plethora of static site generators out there (apparently it's the hip new thing?), so I just had to find one that I was comfortable with using and extending.
I needed it to do what I wanted and get the hell out of the way so I could focus on content.

Oh, and I had to be able to extend it as needed myself.  I'm already pretty comfortable writing for the web, so I decided to go with the [Node.js](http://nodejs.org 'Node.js')-based [Metalsmith](http://www.metalsmith.io/ "Metalsmith website").
Mostly because I'm already comfortable making a mess in javascript.

Metalsmith basically takes a directory full of data, and passes those objects through any series of functions I want, munges them somehow, and then spits out my website.
It's the munging part that's fun, and at least I can extend/modify things as needed quickly and easily.

tl;dr: I use javascript to process the files and output the website ready to upload.

### Responsiveness

I also wanted the site to work well across different screen sizes and devices.
So I'm trying to incorporate some responsiveness in the design. 
You can actually see it working right now by resizing your browser width.
The page should reflow and elements change size to adapt to the new viewport.

This lets me focus on the content while knowing that it should adapt as needed to the viewer.
As a great starting point, I used Adam Kaplans [Grid](http://www.adamkaplan.me/grid/).

### Easy Reading

Taking a cue from the past, I'm also trying to maintain legibility and readability in the pages.
This means paying attention to simple things like characters per line, font choices, and spacing.
I'm not a designer, so this topic has been fun to learn about as I go.

The lines on this post, for instance, should settle in around 60-75 characters per line (I'm aiming for about 65). 
The [Baymard Institute](http://baymard.com/blog/line-length-readability) has a nice summary of the idea behind this.

### Attractive

This goes without saying, I think, but who wants to look at an ugly layout/site?
I can't say this site is beautiful, but at least I'm conciously trying to make it a pleasant experience...

If not for everyone, at least for me...

<!-- FULL-WIDTH -->
<figure class="full-width">
<img src="https://lh6.googleusercontent.com/-kif88EbVMDY/U9F1NpY4YpI/AAAAAAAAQ9I/upgSaUleOaA/s1920/Dot.jpg" alt="Dot Window Portrait"/>
<figcaption>
Attractive to me. Possibly to others, but definitely to me!
</figcaption>
</figure>
<!-- /FULL-WIDTH -->

### Ease of Use

All the pretty in the world won't fix something that's hard to use. 
So I'm trying to put thought into user interaction.
I try to get cruft out of the way so the focus is on the articles, while also providing easy navigation or interaction (that should get the hell out of the way when it's not needed).

## In Summary

That's the short version.
There's a million things going on right now in my head as I build the site out.
I've got most of the pieces sorted out, and just need to finish assembling them in a way that I like.

So we should be ready to get things kicked off before too long!
