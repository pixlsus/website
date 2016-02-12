---
date: 2014-09-08T12:05:13-0500
title: "An Article Test" #required
sub-title: "A subtitle sentence of some sort"
lede-img: "http://1.bp.blogspot.com/-p_PxKysm7UM/U30igw59CSI/AAAAAAAAQK8/MO9nFmN9XVE/s2048/P5180140.jpg"
author: "Pat David" #required
author-img: ""
# author-email: "pat@patdavid.net"
author-url: "http://blog.patdavid.net"
author-bio: "I write things.  I photograph things.  Sometimes they meet."
tags:
    - test
    - single
    - tags
    - "Multi tag with spaces"
template: article.hbt
nodiscuss: true
---

I'm moving off of the blog post section of the site to focus on the main article contents now.
I am re-using much of the work done in the blog, but I am now beginning to branch out to article-specific formatting.
So starting with the blog layout/formatting first, and now I will be tweaking things to fit the article content better.

I realize this is useless text - so please don't judge the quality of my writing by these snippets!

##Template
Article templates are now: `article.hbt`.

I copied over the template I was using for the blog posts `blog-posts.hbt` to `article.hbt`.  Changes to the template for articles should be made in `article.hbt` obviously.

###Author/Date Under Sub-Title
I removed the author and date information from under the sub-title on this page.
That information is better suited to blog posts, I think, and not feature articles.

In order to test the code/pre blocks rendering, I will now show what I am talking about:
```markup
<!-- Begin article content -->
<h1 id="title">{{ title }}</h1>
{{#if sub-title}} <p id="subtitle">{{ sub-title }}</p> {{/if}}
{{!-- 
  {{#if author}} <p class="author-name">{{ author }}</p> {{/if}}
  {{#if date}} <p class="article-date">{{{niceDate date}}}</p> {{/if}}
--}}

```

That relatively useless block of markup was just to test the syntax highlighting in code blocks.
Disregard it.


##CSS Stylesheets
CSS stylesheets for articles specifically are now: `article.css`.

I have copied over the `blogpost.css` stylesheet and renamed it to `article.css`.
All changes for articles should be done there.

I have also copied in-place the `topnav.css` and `push-menu.css` as well.
These are the styles for the push menu on the left, which I will keep for the articles as well.
These two stylesheets *should* be site-wide, so they are being left as-is.

##Folder Layout
Articles should exist below the `articles\` folder, in their own sub-folders.

As an example, this article is: `articles\an article test\`.
The main content for the article is in that directory and named `index.md` for markdown, or `index.html` for html.

##Testing Full-Width Images
I need to test that my code still works for parsing full-width images in a post.
Following this paragraph will be an image marked as "full-width":

<!-- FULL-WIDTH -->
<figure class="full-width">
<img src="https://lh3.googleusercontent.com/-dzpZ6jpJF7E/U0k05P-js8I/AAAAAAAAO7Y/CgrjtmXgoT8/w1650-no/Nikolaikirche.jpg" alt="Nikolaikirche, Leipzig, Germany by Pat David" />
<figcaption>
*A view of [Nikolaikirche](http://en.wikipedia.org/wiki/St._Nicholas_Church,_Leipzig) in Leipzig, Germany.*<br/>
For you [darktable](http://www.darktable.org) fans, that's houz in the bottom right.
</figcaption>
</figure>
<!-- FULL-WIDTH -->

If the image above is full-width, then the good news is that I had the foresight to code it.  Yay!
I need to test that a regular image still works as expected as well.
So below this paragraph should be the same image, but as a normal `<figure>` without the `<!-- FULL-WIDTH -->` tag.

<figure> 
<img src="https://lh3.googleusercontent.com/-dzpZ6jpJF7E/U0k05P-js8I/AAAAAAAAO7Y/CgrjtmXgoT8/w1650-no/Nikolaikirche.jpg" alt="Nikolaikirche, Leipzig, Germany by Pat David" />
<figcaption>
*A view of [Nikolaikirche](http://en.wikipedia.org/wiki/St._Nicholas_Church,_Leipzig) in Leipzig, Germany.*<br/>
For you [darktable](http://www.darktable.org) fans, that's houz in the bottom right.
</figcaption>
</figure>

The image above is the default way in which images will likely be shown in articles.
I am using the `<figure>` tag to test its use where it makes sense.
Here is the same image with a naked `<img>` tag:

<img src="https://lh3.googleusercontent.com/-dzpZ6jpJF7E/U0k05P-js8I/AAAAAAAAO7Y/CgrjtmXgoT8/w1650-no/Nikolaikirche.jpg" alt="Nikolaikirche, Leipzig, Germany by Pat David" />

In markdown right now, the naked `<img>` tag will place the image inside a `<p>` container.

I will also consider making a "big" image option as well (similar to big video).

##Testing Big Video
Speaking of big videos, after this paragraph I will also test the `fluid` and `big` video options.
The first example after this paragraph will be a big & fluid video at the same time:

<div class="big-vid">
<div class="fluid-vid">
<iframe width="560" height="315" src="//www.youtube-nocookie.com/embed/tHTZOu668JM?list=UUMJEM7T8fpJx5CFsi0BfDGA" frameborder="0" allowfullscreen></iframe>
</div>
</div>

If there is a big video showing, then the styles are picking up appropriately.
I should also test a normal fluid embed now as well, so below this paragraph there will be a normal video embed (but made fluid based on the ramblings in [this post](/blog/2014/09/the-big-picture/)).
So let's test it:

<div class="fluid-vid">
<iframe width="560" height="315" src="//www.youtube-nocookie.com/embed/tHTZOu668JM?list=UUMJEM7T8fpJx5CFsi0BfDGA" frameborder="0" allowfullscreen></iframe>
</div>

###Heading 3 Test
Just double-checking the headings here.

#### Heading 4
Again.

##### Heading 5
Yet again.

---

## Experimenting
~~This is an experiment with a new (touch/mobile-friendly) means of doing image comparisons.  Let's see how this works out:~~

<div id="comp-container" style="position:relative;">
<img src="https://lh6.googleusercontent.com/-qXfza-uU-mM/U_zk-kfnIgI/AAAAAAAARRo/11p6ReeRj7s/w966-h725-no/Sarah-Kodak%2BElite%2BColor%2B400.jpg" id="comp-original" alt='New Version' />
<div id="comp-new" style="position:absolute; top:0; left:0; height: 100%; width: 50%; background-size: cover; background-image: url('https://lh5.googleusercontent.com/-LuDGEuWcAeQ/U_zlAWpDU-I/AAAAAAAARSA/wgRmO0BUoUw/w966-h725-no/Sarah-Original.jpg');"></div>
</div>

It turns out not very well as a solution for many, many images.  It's a neat idea that I'm sure I'll use for a single image on a page, but for all comparison images on a page it will bring the browser to its knees.
