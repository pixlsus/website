---
date: 2015-06-24T12:50:16-05:00
title: "Noise Free"
sub-title: "Combining exposures"

lede-img: "Mairi.jpg"
lede-attribution: "<a href='https://www.flickr.com/photos/patdavid/8493807318'>Mairi 6</a> by <a href='http://blog.patdavid.net'>Pat David</a>"

author: "Pat David" #required
author-img: ""
author-url: "http://blog.patdavid.net"
author-twitter: "@patdavid"
author-gplus: ""
author-fb: ""
author-bio: "I <a href='http://blog.patdavid.net'>write</a> things.  I <a href='http://www.flickr.com/photos/patdavid'>photograph</a> things.  Sometimes they meet."
type: "article"
collection: tutorial
tags:
    - darktable
    - GIMP
    - exposure blending
    - Technique
stylesheet: index.css
template: article.hbt
nodiscuss: true
---

## Noise-Free Images?

## The Theory

Expose to the Right (ETTR).
Graphics showing why to ETTR.

- linear sensor
- 12-bit image
- 10-stops of dynamic range

* The brightest stop = 2048 tonal values
* The next brightest stop = 1024 tonal values

|Exposure Level| Tonal Values Available   |
|--|--|
|0EV <small>(brightest)</small>|2048|
|-1EV|1024|
|-2EV|512|
|-3EV|256|
|-4EV|128|
|-5EV|64|
|-6EV|32|
|-7EV|16|
|-8EV|8|
|-9EV <small>(darkest)</small>|4|

## In Practice

- Two exposures
- One normal (0EV)
- One +4EV to shift shadows to the right
- Bring +4EV exposures back down to match 0EV (-4EV)
- Combine images with a mask

Et Voila!  Noise free shadows!
