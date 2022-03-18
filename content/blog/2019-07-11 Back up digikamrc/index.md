---
date: 2019-07-09
title: "Quick digiKam Tip: Back up digikamrc file"

lede-style: "background-size: auto"
lede_attribution: ""

author: "Dmitri Popov"
author_img: "/images/authors/dmitri_popov.png"
author_bio: "Amateur photographer and the author of the <a href='https://gumroad.com/l/linux-photography'>Linux Photography</a> book"

collection: blogposts
layout: blog-posts.hbt
---

digiKam stores the current state of the application in the _~/.config/digikamrc_ file. This file keeps track of pretty much everything: from the database connection profile and custom toolbar settings, to the last-used curve and sharpening parameters. So next time you install or reinstall digiKam, don't forget to back up the _digikamrc_ file. This way, you don't have to configure a fresh digiKam installation from scratch. Simply copy the file to a safe location or external storage device, and drop the file into the _~/.config_ folder before you run digiKam.
