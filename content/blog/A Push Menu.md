---
date: 2014-09-03T12:17:16-05:00
title: "A Push Menu"
sub-title: "A Fanc(y|ier) Menu"
lede_img: /images/logo/pixls-atom.png
lede-style: "background-size: cover; background-repeat: no-repeat;"
author: "Pat David"
author_bio: "I write things.  I photograph things.  Sometimes they meet.  <br/>I <a href='http://blog.patdavid.net'>blog</a> about various things. I write <a href='http://blog.patdavid.net/p/getting-around-in-gimp.html'>tutorials</a> too."
collection: blogposts
layout: blog-posts.hbt
---

So, I've had the idea in my head for a while that it would be nice to get the navigation out of the way.
When I'm reading an article or tutorial, I don't want to be inundated with elements that aren't pertinent to what I'm reading.
I want to focus on the content.
<!--more-->

I had to think a bit on the best way to possibly achieve this.
One option was to remove all navigation from the top of the page, and instead show them at the end of the article.
This runs on the assumption that the user wants to read the page, and when they're finished reading to possibly navigate somewhere else.

If they came to the page by mistake, or want to get out, they can always use "Back" on their browser.
If they made it to the end of the article, then that's the point where they may want other navigation options.
(This is how the page is currently laid out).

If they don't have javascript turned on, they can still use the site just fine.
(This is important for accessibility, and security for some folks).

## What About a Little More?

This is **2014** for the love of Pete!
Surely we can reasonably expect that *most* users will have javascript?
Well, maybe not.
If they do, however, we might be able to create something *slightly* nicer.

I personally like the idea of a menu hidden out of the way until needed.
So I put a small floating logo in the top-left of the page.
If you scroll down, the logo should slide out of view (not needed).
If you scroll up, it should bring the logo back into view (possibly needed).

This has already been here since I started building these pages, but now I've added a little more...

### Push Menu
By default a click on the floating navigation logo will scroll the page to the navigation links on the bottom of the page.
If JS is turned off, the floating logo will always be visible, and when clicked will still get you to the navigation links quickly.

If JS is turned on, though, the floating logo will now "push" the page to the side as it reveals a navigation menu on the left edge of the page.
The first set of links mirror those at the end of the page for site navigation.
The next set of links is a representation of the "Table of Contents" for the current page.

This is anticipation of longer articles being posted soon.
I wanted to have an easier means of navigating long posts.

**Try it out!**

Clicking anywhere on the main page again will collapse the menu.

#### Pure CSS Solution
There may actually be a pure CSS solution for hiding/showing the menu.  The javascript is really only there to manage class states, all of the styling and transition effects are done in CSS.

Honestly, though, I think I'm mostly done for the moment.  I may come back and re-visit the pure CSS solution later, but for now I want to shift focus to working on content pages (and the actual content itself!).

#### Start Simple
My thought process so far on building the site is to minimize any requirements on stuff that's questionable.  I'm only assuming HTML/CSS for the most part.
This is to make sure everything can still be accessible to folks.

It's a royal PITA, though.

### A Table of Contents!
So the addition of basic navigational elements was a no brainer, but that menu bar looked awfully sparse.
So, I used the extra space to include a "Table of Contents" for the current post/article as well.  This is generated automatically from all of the HTML heading tags in the page (h1/2/3/4/5).

My intention at the moment is to also have some sort of a reading progress indicator show up along the TOC.
I think this could provide nice visual feedback to users on where they are in an article, and how far along they might be.

Again, this is something that should degrade just fine in older browsers/no-js.  Those users simply won't see the effect.
