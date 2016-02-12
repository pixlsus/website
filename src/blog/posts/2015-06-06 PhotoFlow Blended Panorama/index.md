---
date: 2015-07-07T09:29:45-05:00

title: "PhotoFlow Blended Panorama Tutorial"
sub-title: "Andrea Ferrero has been busy!"

lede-img: "pano_final2.jpg"
lede-style: "background-size: cover; background-repeat: no-repeat;"
lede-attribution: "by <a href='http://photoflowblog.blogspot.com'>Andrea Ferrero</a>"
lede-img-thumb: "th_pano_final2.jpg"

author: "Pat David" #required
author-img: ""
author-url: "http://blog.patdavid.net"
author-twitter: ""
author-gplus: ""
author-fb: ""
author-bio: "I write things.  I photograph things.  Sometimes they meet.  <br/>I <a href='http://blog.patdavid.net'>blog</a> about various things. I write <a href='http://blog.patdavid.net/p/getting-around-in-gimp.html'>tutorials</a> too."

collection: blogposts 
template: blog-posts.hbt
---

After quite a bit of back and forth I am quite happy to be able to announce that the latest tutorial is up: [A Blended Panorama with PhotoFlow](/articles/a-blended-panorama-with-photoflow/)!
This contribution comes from [Andrea Ferrero], the creator of a new project: [PhotoFlow].

In it, he walks through a process of stitching a panorama together using Hugin and blending multiple exposure options through masking in PhotoFlow (see lede image).
The results are quite nice and natural looking!

<!-- more -->


## Local Contrast Enhancement: Gaussian vs. Bilateral

Andrea also runs through a quick video comparison of doing LCE using both a Gaussian and Bilateral blur, in case you ever wanted to see them compared side-by-side:

<div class='fluid-vid'>
<iframe width="640" height="480" src="https://www.youtube-nocookie.com/embed/Uj4cmXlezVc?rel=0" frameborder="0" allowfullscreen></iframe>
</div>

He [started a topic post](https://discuss.pixls.us/t/local-contrast-enhancement-gaussian-vs-bilateral-blurring/241) about it in the forums as well.



## Thoughts on the Main Page

Over on [discuss] I started a thread to [talk about some possible changes](https://discuss.pixls.us/t/main-site-frontpage-lede/244/4) to the main page of the site.

Specifically I'm talking about the background lede image at the very top of the main page:

<figure>
<img src='https://discuss.pixls.us/uploads/default/optimized/1X/ef803873985000ea678778d99362ad0666dd7c49_1_690x437.png'>
</figure>

I had originally created that image as a placeholder in [Blender].
The site is intended as a photography-centric site, so the natural thought was why not use photos as a background instead?

The thought is to rotate through images as provided by the community.
I've also mocked up two version of using an image as a background.

[**Simple replacement of the image**](/lede-image.html) with photos from the community.
This is the most popular in the poll on the forum at the moment.
The image will be rotated amongst images provided by community members.
I just need to make sure that the text shown is legible over whatever the image may be...


[**Full viewport splash**](/lede-image-full.html) version, where the image fills the viewport.
This is not very popular from the feedback I received (thank you akk, ankh, muks, DrSlony, LebedevRI, and others on irc!). 
I personally like the idea but I can understand why others may not like it.

If anyone wants to chime in (or vote in the poll) then head [over to the forum topic](https://discuss.pixls.us/t/main-site-frontpage-lede/244/4) and let us know your thoughts!

Also, a big **thank you** to [Morgan Hardwood](http://londonlight.org/zp/) for allowing us to use that image as a background example.
If you want a nice way to support F/OSS development, it just so happens that Morgan is a developer for [RawTherapee], and a print of that image is available for purchase.
[Contact him](mailto:photography2015@londonlight.org) for details.


[Andrea Ferrero]: http://photoflowblog.blogspot.fr/
[PhotoFlow]: http://aferrero2707.github.io/PhotoFlow/
[discuss]: //discuss.pixls.us
[Blender]: //blender.org
[RawTherapee]: //www.rawtherapee.com
