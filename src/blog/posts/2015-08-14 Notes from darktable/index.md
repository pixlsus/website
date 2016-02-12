---
date: 2015-08-14T09:32:34-05:00

title: Notes from the dark(table) Side
sub-title: A review of the Open Source Photography Course

lede-img: "darktable_2.jpg"
lede-img-thumb: "th_darktable_2.jpg"
lede-style: "background-position: 0 35%;"
lede-attribution: "<a href='https://www.flickr.com/photos/patdavid/14050852344'>darktable II</a> by <a href='https://www.flickr.com/photos/patdavid/'>Pat David</a> <a class='cc' href=''>cba</a>"

author: 'Pat David'
author-img: ''
author-url: 'http://blog.patdavid.net'
author-twitter: ""
author-gplus: ""
author-fb: ""
author-bio: "I <a href='http://blog.patdavid.net'>write</a> things.<br>I <a href='http://www.flickr.com/photos/patdavid'>photograph</a> things.<br>Sometimes they <a href='//pixls.us'>meet</a>."

collection: blogposts 
template: blog-posts.hbt
---

We recently posted about the Open Source Photography Course from photographer Riley Brandt.
We now also have a review of the course as well.

This review is actually by one of the [darktable] developers, [houz]!
He had originally [posted it on discuss] as a topic but I think it deserves a blog post instead.
(When a developer from a favorite project speaks up, it's usually worth listening...)

Here is houz's review:

---

## The Open Source Photography Course Review
### by houz

<figure>
<img src="houz.jpg" alt="Author houz headshot" />
</figure>


[darktable]: http://wwww.darktable.org
[houz]: http://houz.org
[posted it on discuss]: https://discuss.pixls.us/t/review-of-riley-brandts-open-source-photography-course/344/1

It seems that there is no topic to discuss [The Open Source Photography Course](https://discuss.pixls.us/t/the-open-source-photography-course/263) yet so let's get started.

### Disclaimer
First of all, as a darktable developer I am biased so take everything I write with a grain of salt. Second, I didn't pay for my copy of the videos but Riley was kind enough to provide a free copy for me to review. So add another pinch of salt. I will therefore not tell you if I would encourage you to buy the course. You can have my impressions nevertheless.

### Review
I won't say anything about the GIMP part, not because it wouldn't know how to use that software but it's relatively short and I just didn't notice anything to comment on. It's solid basics of how to use GIMP and the emphasis on layer masks is really important in real world usage.

<!-- more -->

Now for the darktable part, I have to say that I liked it a lot. It showcases a viable workflow and is relatively complete – not by explaining every module and becoming the audio book of the user manual but by showing at least one tool for every task. And as we all know, in darktable there are many ways to skin a cat, so concentrating on your favourites is a good thing.

What I also appreciate is that Riley managed to cut the single topics to manageable chunks of around 10 minutes or less so you can easily watch them in your lunch break and have no problem to come back to one topic later and easily find what you are looking for.

Before this starts to sound like an advertisement I will just point out some small nitpicking things I noticed while watching the videos. Most of these were not errors in the videos but are just extra bits of information that might make your workflow even smoother, so it's more of an addendum than an erratum.

- When going through your images on lighttable you can either zoom in till you only see a single image (alt-1 is a shortcut for that) or hold the z key pressed. Both are shown in the videos. The latter can quickly become tedious since releasing z just once bring you back to where you were. There are however two more keyboard shortcuts that are not assigned by default under views>lighttable: ‘sticky preview’ and ‘sticky preview with focus detection’. Both work just like normal z and ctrl-z, just without the need to keep the key pressed. You can assign a key to these, for example by reusing z and ctrl-z.
- Color labels can be set with F1 .. F5, similar to rating.
- Basecurve and tonecurve allow very fine up/down movement of points with the mouse wheel. Hover over a node and scroll.
- Gaussian in shadows&highlights tends to give stronger halos than bilateral in normal use, see [the darktable blog](http://www.darktable.org/2012/09/edge-aware-image-development/) for an example.
-  For profiled denoising better use ‘HSV color’ instead of ‘color’ and ‘HSV lightness’ instead of ‘lightness’, see [the user manual](http://darktable.org/usermanual/ch03s02s06.html.php) for details.
- When using the mouse wheel to zoom the image you can hold ctrl to get it smaller than fitting to the screen. That's handy to draw masks over the image border.
- When moving the triangles in color zones apart you actually widen the scope of affected values since the curve gets moved off the center line on a wider range.
- Also color zones: You can also change reds and greens in the same instance, no need for multiple instances. Riley knows that and used two instances to be able to control the two changes separately.
- When loading sidecar files from lighttable, you can even treat a JPEG that was exported from darktable like an XMP file and manually select that since the JPEGs get the processing data embedded. It's like a backup of the XMP with a preview. **Caveat:** When using LOTS of mask nodes (mostly with the brush mask) the XMP data might get too big so it's no longer possible to embed in the JPEG, but in general it works.
- The collect module allows to store presets so you can quickly access often used search rules. And since presets only store the module settings and not 
the resulting image set these will be updated when new images are imported.
- In neutral density you can draw a line with the right mouse button, similar to rotating images.
- Styles can also be created from darkroom, there is a small button next to the history compression button.

So, that's it from me. Did you watch the videos, too? What was your impression? Do you have any remarks?
