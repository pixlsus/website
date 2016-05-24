---
date: 2014-09-08T11:06:28-05:00
title: "The Big Picture"
sub-title: "This is all about visual media after all..."
lede-img: "https://lh4.googleusercontent.com/-RVauHGzbPRQ/UwvCg3d4Q6I/AAAAAAAAOS4/pLGsqpAM_8E/w1650-no/Into%2Bthe%2BFog.jpg"
lede-style: "background-size: cover; background-repeat: no-repeat;"
lede-attribution: "Into the Fog by <a href='http://blog.patdavid.net'>Pat David</a>"
author: "Pat David"
author-bio: "I write things.  I photograph things.  Sometimes they meet.  <br/>I <a href='http://blog.patdavid.net'>blog</a> about various things. I write <a href='http://blog.patdavid.net/p/getting-around-in-gimp.html'>tutorials</a> too."
collection: blogposts
layout: blog-posts.hbt
---

Sometimes I get into weird OCD mode where I need to have something for better or worse.
One of those things was a desire to break out of the mold of standard blog-type posts in articles for this site.
I've sometimes found images are relegated to second-class citizens on some page layouts that don't do them justice.

I couldn't let that happen here.
The problem was that I needed to do some things to make sure the typographic layouts were visually strong as well.
This meant a adding control to width and layout of main text elements, with the downside of having to hack a bit to make images large.
<!--more-->
The solution I ended up with was to add a tag surrounding elements that I wanted to break out of the current layout.
So I would end up with something like this:

```markup
<!-- FULL-WIDTH -->
<img src="http://to be full width.png"/>
<!-- /FULL-WIDTH -->
```

Technically, in my case, I'm using the `<figure>` tag with `<figcaption>`, so my actual markup for full-width images looks like this:

```markup
<!-- FULL-WIDTH -->
<figure>
<img src="http://full-width-image-src.jpg" />
<figcaption>A caption for my image</figcaption>
</figure>
<!-- /FULL-WIDTH -->
```
This let me capture that block in my processing when I build the site (metalsmith), and to modify the page code to accommodate what's needed to make it full-width.
The result of this is that I can now break images out of their containers to span the full width of a page, like this:

<!-- FULL-WIDTH -->
<figure class="full-width">
<img src="https://lh3.googleusercontent.com/-dzpZ6jpJF7E/U0k05P-js8I/AAAAAAAAO7Y/CgrjtmXgoT8/w1650-no/Nikolaikirche.jpg" alt="Nikolaikirche, Leipzig, Germany by Pat David" />
<figcaption>
*A view of [Nikolaikirche](http://en.wikipedia.org/wiki/St._Nicholas_Church,_Leipzig) in Leipzig, Germany.*<br/>
For you [darktable](http://www.darktable.org) fans, that's houz in the bottom right.
</figcaption>
</figure>
<!-- FULL-WIDTH -->

Of course, this can get very tiring very quickly.
I find that it tends to break the flow of reading, so should be used sparingly and wisely in the context of the post or article.
I promise not to abuse it.

## Attribution
It's a small thing, but I've added an attribution line for the lede images that you'll find in the bottom right of the actual image.
I will also be incorporating the [Creative Commons](http://creativecommons.org/ "Creative Commons") icon fonts to support proper attribution notice as well.
Once I've done that, I will include a similar style attribution for other images (as it stands now, they can be put into the `<figure>` image caption).

## Video Killed the Radio Star
Of course, sometimes what is needed to really explain a concept is to use a video. 
So I couldn't just ignore a way to get good video styling.

My first hurdle was to find a way to keep the video container fluid with the rest of the page.
Remember, the page is built to be responsive, so it's a single page served to all devices.
This means that I need to adapt to all possible viewing device screen resolutions (as well as possible).

Getting images to scale and resize correctly to fit new sizes was easy.
Doing the same thing for video is not *as* easy, but wasn't too bad.
Once again, I'm relying on the kindness of strangers...

### The Code
The answer came in the form of an [A List Apart](http://alistapart.com/article/creating-intrinsic-ratios-for-video/) article from 2009 by Thierry Koblentz.
The basic premise was to create a box to contain the video embed, then to stretch the video to fill the box dimensions.
Then I could still the box to be responsive just like the other elements.

So I wrapped the video embed in a container box, and added some CSS classes:

```markup
<div class="fluid-video">
  <iframe src="http://Normal Youtube Embed Code"/>
</div>
```

Then it was just a matter of styling by setting the `padding` property to be percentage based on th width of the container.
To use a 16:9 ratio, the percentage should be 56.25%:

```css
.fluid-video {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px;
    height: 0;
    overflow: hidden;
}
```

With the container styled, it was a simple matter to fill the container with the embedded video:

```css
.fluid-video iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
```

Et voila!  Fluid video embeds that *hopefully* should maintain responsiveness.

Of course, I couldn't leave well enough alone, and to coincide with the previous idea of displaying larger images, I have also added a little extra to embiggen video embeds as well (not full width stretching, but to give it a bit more prominence).

<div class="big-vid">
<div class="fluid-vid">
<iframe width="560" height="315" src="//www.youtube-nocookie.com/embed/tHTZOu668JM?list=UUMJEM7T8fpJx5CFsi0BfDGA" frameborder="0" allowfullscreen></iframe>
</div>
</div>

Technically I'm stretching the video to 150% of the width of it's parent container, which happens to be the same container as the `<p>` elements (so roughly 150% of the text column width).
Mostly I was going to use this type of styling for highlight videos, and leave a normal video embed if it's not the focus of the article.

Just for reference, a normal (fluid) embed would look like this relative to the surrounding text:

<div class="fluid-vid">
<iframe width="560" height="315" src="//www.youtube-nocookie.com/embed/tHTZOu668JM?list=UUMJEM7T8fpJx5CFsi0BfDGA" frameborder="0" allowfullscreen></iframe>
</div>

Which makes more sense for supporting material vs. feature videos.

## Wrap it up Already
Ok, I could ramble on for longer, but I think my time is better spent getting back to writing the site.
I think the blog back-end and formatting is mostly done at this point, so on to feature articles!
