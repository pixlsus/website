---
date: 2015-05-18T11:38:01-05:00

title: "Software and Noise"
sub-title: "Wonderful response from everyone"

lede-img: "Unnecessary_Noise.jpg"
lede-style: "background-size: cover; background-repeat: no-repeat;"
lede-attribution: "<a href='https://www.flickr.com/photos/pamhule/4461831240'>Unnecessary Noise Prohibited</a> by <a href='https://www.flickr.com/photos/pamhule/'>Jens Schott Knudsen</a> <a class='cc' href='https://creativecommons.org/licenses/by-sa/2.0/' target='_blank'>cbn</a>"
lede-img-thumb: "th_Unnecessary_Noise.jpg"

author: "Pat David"
author-bio: "I <a href='http://blog.patdavid.net'>write things</a>.  I <a href='https://www.flickr.com/photos/patdavid/'>photograph</a> things.  Sometimes they meet.  <br/> I write <a href='http://blog.patdavid.net/p/getting-around-in-gimp.html'>tutorials</a> too."
collection: blogposts
layout: blog-posts.hbt
---

I want to take a moment to thank everyone for all of the kind words and support over the past week.
A positive response can be a great motivator to help keep the momentum rolling (and everyone really has been super positive)!


## Software

The **[Software page][]** is live with a decent start at a list.

I posted an announcement of the site launch over on [reddit][] and one of the comments (from [/u/cb900crdr][]) was that it might be helpful to have a list of links to programs.
I had originally planned on having a page to list the various projects but removed it just before launch (until I could find some time to gather all the links).

This was as good a reason as any to take a shot at putting a page together.
I brought the topic up [on the forums][] to get input from everyone as well.
If you see that I've missed anything, please consider adding it to the list on the forum.
<!-- more -->


I think it may be helpful to add at least a sentence or two description to identify what each project does for those not familiar with them.
For instance, if you didn't know what Hugin was before, the name by itself is not very helpful (or GIMP, or G'MIC, etc...).
The problem is how to do it without cluttering up the page too much.



## Noise

I had also mentioned [in this post][] on the forums about a neat method for basically replacing shadow tones in one image with those from second, overexposed image.
The approach is similar in theory to tonemapping an HDR and is originally described by [Guillermo Luijk][] (back in 2007).

The process basically exploits the fact that digital sensors have a linear response (a basis for the advice ETTR - *"Expose to the Right"*).
His suggested workflow is to use a second exposure of the scene but exposed +4EV.
Then to adjust the exposure of the second image down -4EV and then replace the shadow tones in the base image with the adjusted (noise-reduced) one.

I will write an article soon describing the workflow in a bit more detail.  Stay tuned!

<small class="lede-attr">Lede image: 
<a href='https://www.flickr.com/photos/pamhule/4461831240'>*Unnecessary Noise Prohibited* </a> by <a href='https://www.flickr.com/photos/pamhule/'>Jens Schott Knudsen</a> <a class='cc' href='https://creativecommons.org/licenses/by-sa/2.0/' target='_blank'>cbn</a>
</small>

[reddit]: http://www.reddit.com
[/u/cb900crdr]: http://www.reddit.com/r/photography/comments/35b7y4/new_community_for_freeopen_source_photography/cr30jeo
[on the forums]: https://discuss.pixls.us/t/free-software-list-and-links/193/8
[Software page]: https://pixls.us/software/
[in this post]: https://discuss.pixls.us/t/noise-free-shadows-dual-exposure/204
[Guillermo Luijk]: http://www.guillermoluijk.com/article/nonoise/index_en.htm
