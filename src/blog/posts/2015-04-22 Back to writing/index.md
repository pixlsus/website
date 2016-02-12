---
date: 2015-04-22T12:00:15-05:00
title: "Back to Writing"
sub-title: "Hiccups and Other Things"

lede-img: "Tacky.jpg"
lede-style: "background-size: cover; background-repeat: no-repeat;"
lede-attribution: "<a href='https://www.flickr.com/photos/patdavid/16548303178/'>Tacky Amalgamation</a> by <a href='https://www.flickr.com/photos/patdavid/'>Pat David</a> <a class='cc' href='https://creativecommons.org/licenses/by-sa/2.0/' target='_blank'>cb</a>"
lede-img-thumb: "th_Tacky.jpg"

author: "Pat David"
author-bio: "I <a href='http://blog.patdavid.net'>write things</a>.  I <a href='https://www.flickr.com/photos/patdavid/'>photograph</a> things.  Sometimes they meet.  <br/> I write <a href='http://blog.patdavid.net/p/getting-around-in-gimp.html'>tutorials</a> too."
collection: blogposts
template: blog-posts.hbt
---

I took a bit of a break from writing articles to [work on](//pixls.us/blog/2015/04/a-forum) getting [the forums](https://discuss.pixls.us) up and running.
We are almost back to a stable enough point that I want to turn my attention back to writing.

I say almost because there are still a few wonky things that I'd like to work out.
There is still a little bit of an issue with the comment embeds from the forum for full-blown [articles](/articles/).



## SSL and https
One of the reasons for the possibly strange behavior for articles in the forums is that darix convinced me to go ahead and get SSL setup for the domains.  So working on it yesterday we got it running for both the [main site here](https://pixls.us), as well as at [the forums](https://discuss.pixls.us).

You should notice an indicator in your browser that your connection is over https somewhere (a little green lock?) for this page right now.
I've set all connections to [PIXLS.US](//pixls.us) to use SSL now (same thing with the forums).

<!-- more -->
The only drawback was that we uncovered some strange behavior when importing posts into the forum for embedding.
If you care, the way things work is that:

1. I publish an RSS feed of all of the content on the site (https://pixls.us/feed.xml if you're curious).
2. Every hour the forum polls this feed.
3. If there's new posts, the forum imports them and creates a new topic.
This is what you see under the "PIXLS.US" category on the forum.
4. Some small code on each post (on the website) references the forum topic entry to embed as comments.

There have been a couple of strange things going on with importing those posts, but darix resolved most of them.
The only thing that is still strange is the article objects themselves, which at the moment show up twice in the forum.

I should not that all of this could very well be caused by my writing the RSS feeds.
I know just enough to be dangerous and annoying to those who know better (this should probably be my epitaph).

> **Here Lies Pat David**

> He knew just enough to be dangerous and annoy those who knew better...

Fitting!

On the good side, thanks to the efforts of those smarter than I, even though we had some import hiccups, things have continued to run smoothly for the most part.
The correct comments were maintained in the correct topic threads, and those were in turn correctly associated with the posts they belonged to (well, *blog* posts at any rate).

Coming soon(*ish*) - creating showcase posts!
