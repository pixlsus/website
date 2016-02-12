---
date: 2015-12-15T13:53:26-05:00

title: Let's Encrypt!
sub-title: Also a neat 2.5D parallax video for Wikipedia.

lede-img: LE.jpg
lede-img-thumb: th_LE.jpg
lede-style: ""
lede-attribution: ""

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


I finally got off my butt to get a process in place to obtain and update security certificates using Let's Encrypt for both [pixls.us][] and [discuss.pixls.us][].
I also did some (*more*) work with [Victor Grigas][] and [Wikipedia][] to support their [#Edit2015][1] video this year.

[pixls.us]: //pixls.us
[discuss.pixls.us]: //discuss.pixls.us
[Wikipedia]: http://www.wikipedia.org
[1]: https://www.youtube.com/watch?v=Rm1LKcHD1VE

<!-- more -->

## Wikipedia #Edit2015

Last year, I did some 2.5 parallax animations for Wikipedia to help with their first-ever [end-of-the-year retrospective video][edit2014] ([see the blog post from last year](http://blog.patdavid.net/2014/12/wikipedia-edit2014-video.html)).
Here is the retrospective from #Edit2014:

[edit2014]: http://blog.wikimedia.org/2014/12/17/wikipedias-first-ever-annual-video-reflects-contributions-from-people-around-the-world/

<div class='fluid-vid'>
<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/ci0Pihl2zXY?rel=0" frameborder="0" allowfullscreen></iframe>
</div>


So it was an honor to hear from [Victor Grigas][] again this year!
This time around there was a neat new crop of images he wanted to animate for the video.
Below you'll find my contributions (they were all used in the final edit, just shortened to fit appropriately):

[Victor Grigas]: https://commons.wikimedia.org/wiki/User:Victorgrigas


<figure style='width: 100%;'>
<div class='fluid-vid'><iframe src="https://player.vimeo.com/video/146782845?portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>
<figcaption>
<a href="https://vimeo.com/146782845">Wiki #Edit2015 Bel</a> from <a href="https://vimeo.com/patdavid">Pat David</a> on <a href="https://vimeo.com">Vimeo</a>.
</figcaption>
</figure>

<figure style='width: 100%;'>
<div class='fluid-vid'><iframe src="https://player.vimeo.com/video/146784000?portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div> 
<figcaption><a href="https://vimeo.com/146784000">Wiki #Edit2015 Je Suis Charlie</a> from <a href="https://vimeo.com/patdavid">Pat David</a> on <a href="https://vimeo.com">Vimeo</a>.</figcaption>
</figure>

<figure style='width: 100%;'>
<div class='fluid-vid'><iframe src="https://player.vimeo.com/video/146790790?portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div> 
<figcaption><a href="https://vimeo.com/146790790">Wiki #Edit2015 Samantha Cristoforetti Nimoy Tribute</a> from <a href="https://vimeo.com/patdavid">Pat David</a> on <a href="https://vimeo.com">Vimeo</a>.</figcaption>
</figure>

<figure style='width: 100%;'>
<div class='fluid-vid'><iframe src="https://player.vimeo.com/video/146791049?portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div> 
<figcaption><a href="https://vimeo.com/146791049">Wiki #Edit2015 SCOTUS LGBQT</a> from <a href="https://vimeo.com/patdavid">Pat David</a> on <a href="https://vimeo.com">Vimeo</a>.</figcaption>
</figure>

Here is the final cut of the video, just released today:

<figure class='big-vid'>
<div class='fluid-vid'>
<iframe width="1280" height="720" src="https://www.youtube-nocookie.com/embed/Rm1LKcHD1VE?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
</figure>

Victor chose some really neat images that were fun to work on!
Of course, all free software was used in this creation ([GIMP][] for cutting up the images into sections and rebuilding textures as needed and [Blender][] for re-assembling the planes and animating the camera movements).
I had previously [written a tutorial][] on doing this with free software on my blog.

[GIMP]: https://www.gimp.org
[Blender]: http://www.blender.org
[written a tutorial]: http://blog.patdavid.net/2014/02/25d-parallax-animated-photo-tutorial.html

You can [read more on the wikimedia.org blog](http://blog.wikimedia.org/2015/12/15/edit2015/)!


## New Certificates

<img src="letsencrypt-logo-horizontal.png" alt="Let's Encrypt Logo" style='width:initial;' width='550' height='131'/>

Yes, this is not very exciting I'll concede.
I think it _is_ important though.

I recently took advantage of my beta invite to [Let's Encrypt][LE].
It's a certificate authority that provides free X.509 certs for domain owners that was founded by the [Electronic Frontier Foundation][EFF], [Mozilla][Moz], and the [University of Michigan][UM].

[LE]: https://letsencrypt.org
[EFF]: https://www.eff.org/
[Moz]: www.mozilla.org
[UM]: https://www.umich.edu/

The key principles behind *Let's Encrypt* are:

  * __Free:__ Anyone who owns a domain name can use Let’s Encrypt to obtain a trusted certificate at zero cost.
  * __Automatic:__ Software running on a web server can interact with Let’s Encrypt to painlessly obtain a certificate, securely configure it for use, and automatically take care of renewal.
  * __Secure:__ Let’s Encrypt will serve as a platform for advancing TLS security best practices, both on the CA side and by helping site operators properly secure their servers.
  * __Transparent:__ All certificates issued or revoked will be publicly recorded and available for anyone to inspect.
  * __Open:__ The automatic issuance and renewal protocol will be published as an open standard that others can adopt.
  * __Cooperative:__ Much like the underlying Internet protocols themselves, Let’s Encrypt is a joint effort to benefit the community, beyond the control of any one organization.

It was relatively painless to obtain the certs.
I only had to run their program to use ACME to verify my domain ownership through placing a file on my web root.
Once the certs were generated I only had to make some small changes for it to work automatically on https://discuss.pixls.us.
(And to automatically get picked up when I update the certs within 90 days).

I still had to manually copy/paste the certs into cpanel for https://pixls.us, though.
Not automated (*or elegant*) but it works and only takes an extra moment to do.

<!-- more -->
