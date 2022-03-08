---
date: 2018-12-31T15:16:40-06:00 
title: Goodbye Google Analytics
sub-title: A little less tracking for the new year

lede_img: "laffland.jpg"
lede_img_thumb: "th_laffland.jpg"
lede_attribution: "Laffland by Pat David"

author: Pat David
author_img: 
author_bio: "I <a href='http://blog.patdavid.net'>write</a> things.<br>I <a href='http://www.flickr.com/photos/patdavid'>photograph</a> things.<br>Sometimes they <a href='https://pixls.us'>meet</a>."

collection: blogposts
layout: blog-posts.hbt

---

Over on my personal website I decided to [stop using third party trackers and assets](https://patdavid.net/2018/05/goodbye-google-analytics/) to keep from exposing visitors to unintended tracking.
Third party assets expose a user to being tracked and analyzed by those third (or fourth, or more) parties and honestly this is something the web could use a little (lot) less of.
I loved having stats early on when we started this crazy idea for a community and as I mentioned on my blog post, it's a Faustian bargain to get stats at the expense of allowing Google to track what all the users of the site are doing.
**No thanks.**

<!--more-->

I figure it's the eve of a new year so why not start it out right and reduce the tracking footprint of the site?

This all started by noticing that some new browser feature strips referer information from requests (thanks @darix) and we were using them to target specific areas of websites that we manage comments for.
It came to my attention when I was reading the release announcement for [digiKam 6.0.0 beta 3](https://www.digikam.org/news/2018-12-30-6.0.0-beta3_release_announcement/).

While fixing that problem, I found that once we fixed the referer requirement problem I was still seeing issues with [Privacy Badger][] blocking our embed code.
On [further inspection][] it boiled down to using Google Analytics on our base domain (pixls.us) and having a cookie set by Google, which then got sent with embed requests from other websites ([digiKam][] and [darktable][]).
This triggered the heuristic blocking by Privacy Badger.

Honestly, we derive very little value from the analytics for the price (_privacy_) we pay to use it.
Better to simply remove it.

We _still_ do analytics but we own the stack ourselves (thank you so much andabata!).
If you want to block our own analytics the domain is: `piwik.pixls.us`.

[Privacy Badger]: https://www.eff.org/privacybadger "EFF Privacy Badger Website"
[further inspection]: https://github.com/EFForg/privacybadger/issues/2257 "EFF Privacy Badger Issue Tracker"
[digiKam]: https://www.digikam.org "digiKam website"
[darktable]: https://darktable.org/ "darktable website"
