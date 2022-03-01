---
date: 2015-03-30T17:31:36-05:00
title: "All the Articles"
sub-title: "My God, It's Full of Articles"
lede-img: "M31 - Adam Evans.jpg"
lede-style: "background-size: cover; background-repeat: no-repeat;"
lede-attribution: "<a href='https://www.flickr.com/photos/astroporn/4869858064/'>M31, Andromeda Galaxy</a> by <a href='https://www.flickr.com/photos/astroporn/'>Adam Evans</a> <a class='cc' href='https://creativecommons.org/licenses/by-nc/2.0/' target='_blank'>cbn</a>"
author: "Pat David"
author-bio: "I <a href='http://blog.patdavid.net'>write things</a>.  I <a href='https://www.flickr.com/photos/patdavid/'>photograph</a> things.  Sometimes they meet.  <br/> I write <a href='http://blog.patdavid.net/p/getting-around-in-gimp.html'>tutorials</a> too."
collection: blogposts
layout: blog-posts.hbt
---

I spent a little time struggling conceptually with how I wanted to categorize the different types of content I am planning for this site.
As I had [previously noted](/blog/2015/02/some-updates/), I was already done with creating a *blog post* type of content, and had noted that I was working on how to show tutorials and 'showcase' types of posts.

Apparently, I had the answer in mind when I created that graphic last month.
If you notice the two other types of content I am working on, *Tutorials* and *Showcase*, are both listed as types **Articles** on the graphic.

<!-- more -->
<figure class='big-vid'>
<img src='http://pixls.us/blog/2015/02/some-updates/Some Updates 4.png' alt='site content types - Blog, Tutorials, Showcase' />
</figure>


Of course.
There will only be two distinct types of content from the viewpoint of the site, *blogposts* and *articles*.
I will then use the features of the static-site generator I use for this site, [metalsmith](http://metalsmith.io), to manage the content presentation (tutorials, showcase, etc).
This will be handled through collections in metalsmith.

So at the end of the day, even though there will be a section of *Tutorials* and *Showcase* or whatever else I come up with (or someone else), the bottom line is that the base content object will be an **Article**.

I like this approach, as it leaves a large amount of flexibility while maintaining a nice sense of simplicity.
(Anything that lowers the barrier to writing and publishing material is good in my book).



## An Aside on Collections in Metalsmith

This is just a note to myself in case I forget what I was on about with collections.

There are basically two ways of associating an *article* with a collection, through metadata on the file and through a matching pattern during compile time.
Unfortunately, as near as I can tell, you can't do them both at the same time for the same collection type.



### Metadata

Doing it through metadata assocation only requires that in the front-matter of the file, the collection type is called out, like `collection: tutorial`.
For example, here's a sample of the front-matter for this blog post:

```javascript
---
date: 2015-03-30T17:31:36-05:00
title: "All the Articles"
sub-title: "My God, It's Full of Articles"
lede-img: "M31 - Adam Evans.jpg"
author: "Pat David"
collection: blogposts
layout: blog-posts.hbt
---
```

In this case, the post will be added to the collection, *blogposts*.



### Pattern Matching

In the `index.js` for the site, there's a section for using collections where a pattern can be specified to add files:

```javascript
.use( collections({
    articles: {
        pattern: 'articles/*/index.html',
        sortBy: 'date',
        reverse: true
        }
}))
```

This glob pattern will simply add all the posts in a folder in the `articles/` directory to the collection, *articles*.

In fact, this is actually how I want to collect all *articles* on the site for archive purposes.
I'll want a page on the site that will list all of the articles that will be published, regardless of further classifications.
I feel that it is helpful for people searching for information to have a single page listing of all the material on the site (I did something similar with my blog by adding [an archive page](http://blog.patdavid.net/p/archive.html)).



## Happy!

So these pieces sort of falling into place make me happy because it means that I am much closer to having a setup how I would like it to be.
I can get started writing these other article types now without worrying as much about the back end.

Rather, I only need to focus on creating the landing pages for the content type (tutorials/, showcase/, etc...).
Yay!
More time to spend on writing new stuff!



## Discourse

![Discourse Logo](discourse.png)

I had mentioned it previously, but darix on `#darktable` has been an immense help in testing out [Discourse](http://discourse.org) for me.
He has gotten it to a point where it mostly works so the only thing holding me back from getting it rolled out is deciding how/where to host the instance.

If anyone has any thoughts or suggestions, I'm all ears!
To use Darix's discourse, I'll need openSUSE 13 at least.
Otherwise, I could probably buy a droplet on Digital Ocean and host it there for now.
