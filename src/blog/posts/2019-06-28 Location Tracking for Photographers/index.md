---
date: 2019-06-28
title: "Location Tracking for Photographers with GPS Logger and Trekarta"
author: "Dmitri Popov"
author-bio: "Amateur photographer and the author of the <a href='https://gumroad.com/l/linux-photography'>Linux Photography</a> book"
collection: blogposts
layout: blog-posts.hbt
---

When it comes to Android apps for photographers, we are spoiled for choice. From depth-of-field and golden hour calculators to sun position and remote control apps -- there are plenty of clever tools to choose from. But there is one particular app combination that can prove to be indispensable for any photographer on the move: a GPS logger and a GPX viewer. There are two main reasons for that.

1. Tracking your movements and saving them in the GPX format can come in handy for geotagging photos.

2. The ability to attach comments to the current location allows you to use the GPS logging app to note places you either photographed or you plan to photograph later. You can then use a GPX viewer app to see and manage bookmarked locations.

There are several apps that offer GPS logging and viewing, but you can't go wrong with [GPS Logger for Android](https://gpslogger.app/) and [Trekarta](https://trekarta.info/). Both apps are released under an open source license, and they are available free of charge on Google Play and F-Droid.

How you set up GPS Logger for Android is a matter of personal preference. One way to go is to configure the app to automatically start tracking on boot and upload tracks to the desired destination (e.g., a NAS or a file sharing service).

Once GPS Logger for Android is running, adding a comment to the current location is as easy as pulling down the notification drawer and tapping **Comment**. The app saves the tracks as GPX files in the _Android/data/com.mendhak.gpslogger/files_ directory on your Android device. To view a GPX file in Trekarta, use a file manager to navigate to the directory, and use Android's sharing functionality to send the desired GPX file to Trekarta.
