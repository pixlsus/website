--- 
date: 2016-06-09T16:50:08-06:00 

title: Display Color Profiling on Linux
sub-title: A work in progress

lede-img: 'pixels.jpg'
lede-style: 'background-color: white; background-position: 0;'
lede-attribution: "Real Pixels"

author: 'Pascal de Bruijn'  #required
author-img: '/images/authors/pmjdebruijn.png'
author-url: https://encrypted.pcode.nl
author-twitter: ''
author-bio: "Barely even a darktable developer anymore.<br><a href='https://encrypted.pcode.nl'>https://encrypted.pcode.nl</a>"

canonical: https://encrypted.pcode.nl/blog/2013/11/24/display-color-profiling-on-linux/

type: article
collection: tutorial
tags:
    - color management

stylesheet: index.css
layout: article.hbt

---

<small style='color:#aaa;'>_This article by [Pascal de Bruijn][pascal] was originally [published on his site][pcode] and is reproduced here with permission. &nbsp;&mdash;Pat_</small>

---

**Attention:** This article is a work in progress, based on my own practical experience up until the time of writing, so you may want to check back periodically to see if it has been updated.

This article outlines how you can calibrate and profile your display on Linux, assuming you have the right [equipment](http://argyllcms.com/doc/instruments.html) (either a colorimeter like for example the i1 Display Pro or a spectrophotometer like for example the ColorMunki Photo). For a general overview of what color management is and details about some of its parlance you may want to read [this](https://encrypted.pcode.nl/blog/2012/01/29/color-management-on-linux/) before continuing.

<!-- more -->


## A Fresh Start

First you may want to check if any kind of color management is already active on your machine, if you see the following then you’re fine:

    $ xprop -display :0.0 -len 14 -root _ICC_PROFILE
    _ICC_PROFILE: no such atom on any window.

However if you see something like this, then there is already another color management system active:

    $ xprop -display :0.0 -len 14 -root _ICC_PROFILE
    _ICC_PROFILE(CARDINAL) = 0, 0, 72, 212, 108, 99, 109, 115, 2, 32, 0, 0, 109, 110


If this is the case you need to figure out what and why… For GNOME/Unity based desktops this is fairly typical, since they extract a simple profile from the display hardware itself via [EDID](https://encrypted.pcode.nl/blog/2013/04/14/display-profiles-generated-from-edid/) and use that by default. I’m guessing KDE users may want to look into [this](http://dantti.wordpress.com/2013/05/01/colord-kde-0-3-0-released/) before proceeding. I can’t give much advice about other desktop environments though, as I’m not particularly familiar with them. That said, I tested most of the examples in this article with XFCE 4.10 on [Xubuntu](http://xubuntu.org/) 14.04 “Trusty”.



## Display Types

Modern flat panel displays are comprised of two major components for purposes of our discussion, the backlight and the panel itself. There are various types of backlights, White [LED](https://en.wikipedia.org/wiki/Light-emitting_diode) (most common nowadays), [CCFL](https://en.wikipedia.org/wiki/Cold_cathode) (most common a few years ago), RGB LED and Wide Gamut CCFL, the latter two of which you’d typically find on higher end displays. The backlight primarily defines a displays [gamut](https://en.wikipedia.org/wiki/Gamut) and maximum brightness. The panel on the other hand primarily defines the maximum contrast and acceptable viewing angles. Most common types are variants of [IPS](https://en.wikipedia.org/wiki/Liquid-crystal_display#In-plane_switching_.28IPS.29) (usually good contrast and viewing angles) and [TN](https://en.wikipedia.org/wiki/Liquid-crystal_display#Twisted_nematic_.28TN.29) (typically mediocre contrast and poor viewing angles).



## Display Setup

There are two main cases, there a laptop displays, which usually allow for little configuration, and regular desktop displays. For regular displays there are a few steps to prepare your display to be profiled, first you need to reset your display to its factory defaults. We leave the contrast at its default value. If your display has a feature called dynamic contrast you need to disable it, this is _critical_, if you’re unlucky enough to have a display for which this cannot be disabled, then there is no use in proceeding any further. Then we set the color temperature setting to custom and set the R/G/B values to equal values (often 100/100/100 or 255/255/255). As for the brightness, set it to a level which is comfortable for prolonged viewing, typically this means reducing the brightness from its default setting, this will often be somewhere around 25-50 on a 0-100 scale. Laptops are a different story, often you’ll be fighting different lighting conditions, so you may want to consider profiling your laptop at its full brightness. We’ll get back to the brightness setting later on.

Before continuing any further, let the display settle for at least half an hour (as its color rendition may change while the backlight is warming up) and make sure the display doesn’t go into power saving mode during this time.

Another point worth considering is cleaning the display before starting the calibration and profiling process, do keep in mind that displays often have relatively fragile coatings, which may be deteriorated by traditional cleaning products, or easily scratched using regular cleaning cloths. There are specialist products [available](https://www.klearscreen.com/iKlear.aspx) for safely cleaning computer displays.

You may also want to consider dimming the ambient lighting while running the calibration and profiling procedure to prevent (potential) glare from being an issue.



## Software

If you’re in a GNOME or Unity environment it’s highly recommend to use [GNOME Color Manager](https://projects.gnome.org/gnome-color-manager/) (with [colord](http://www.freedesktop.org/software/colord/) and [argyll](http://argyllcms.com/)). If you have recent versions (3.8.3, 1.0.5, 1.6.2 respectively), you can profile and setup your display completely graphically via the Color applet in System Settings. It’s fully wizard driven and couldn’t be much easier in most cases. This is what I personally use and recommend. The rest of this article focuses on the case where you are not using it.

Xubuntu users in particular can get experimental packages for the latest [argyll](http://argyllcms.com/) and optionally [xiccd](https://github.com/agalakhov/xiccd) from my [xiccd-testing](https://launchpad.net/~pmjdebruijn/+archive/xiccd-testing) PPAs. If you’re using a different distribution you’ll need to source help from its respective community.



## Report On The Uncalibrated Display

To get an idea of the displays uncalibrated capabilities we use argyll’s [dispcal](http://www.argyllcms.com/doc/dispcal.html):

    $ dispcal -H -y l -R
    Uncalibrated response:
    Black level = 0.4179 cd/m^2
    50%   level = 42.93 cd/m^2
    White level = 189.08 cd/m^2
    Aprox. gamma = 2.14
    Contrast ratio = 452:1
    White     Visual Daylight Temperature = 7465K, DE 2K to locus =  3.2

Here we see the display has a fairly high uncalibrated native whitepoint at almost 7500[K](https://en.wikipedia.org/wiki/Color_temperature#Categorizing_different_lighting), which means the display is bluer than it should be. When we’re done you’ll notice the display becoming more yellow. If your displays uncalibrated native whitepoint is below [6500K](https://en.wikipedia.org/wiki/Illuminant_D65) you’ll notice it becoming more blue when loading the profile.

Another point to note is the fairly high white level (brightness) of almost 190 [cd/m<sup>2</sup>](https://en.wikipedia.org/wiki/Candela_per_square_metre), it’s fairly typical to target 120 [cd/m<sup>2</sup>](https://en.wikipedia.org/wiki/Candela_per_square_metre) for the final calibration, keeping in mind that we’ll lose 10 [cd/m<sup>2</sup>](https://en.wikipedia.org/wiki/Candela_per_square_metre) or so because of the calibration itself. So if your display reports a brightness significantly higher than 130 [cd/m<sup>2</sup>](https://en.wikipedia.org/wiki/Candela_per_square_metre) you may want to considering turning down the brightness another notch.



## Calibrating And Profiling Your Display

First we’ll use argyll’s [dispcal](http://argyllcms.com/doc/dispcal.html) to measure and adjust (calibrate) the display, compensating for the displays [whitepoint](https://en.wikipedia.org/wiki/White_point) (targeting [6500K](https://en.wikipedia.org/wiki/CIE_Standard_Illuminant_D65)) and [gamma](https://en.wikipedia.org/wiki/Gamma_correction) (targeting industry standard 2.2, more info on gamma [here](http://argyllcms.com/doc/gamma.html)):

    $ dispcal -v -m -H -y l -q l -t 6500 -g 2.2 asus_eee_pc_1215p

Next we’ll use argyll’s [targen](http://argyllcms.com/doc/targen.html) to generate measurement patches to determine its [gamut](https://en.wikipedia.org/wiki/Gamut):

    $ targen -v -d 3 -G -f 128 asus_eee_pc_1215p

Then we’ll use argyll’s [dispread](http://argyllcms.com/doc/dispread.html) to apply the calibration file generated by [dispcal](http://argyllcms.com/doc/dispcal.html), and measure (profile) the displays gamut using the patches generated by [targen](http://argyllcms.com/doc/targen.html):

    $ dispread -v -N -H -y l -k asus_eee_pc_1215p.cal asus_eee_pc_1215p

Finally we’ll use argyll’s [colprof](http://argyllcms.com/doc/colprof.html) to generate a standardized ICC (version 2) color profile:

    $ colprof -v -D "Asus Eee PC 1215P" -C "Copyright 2013 Pascal de Bruijn" \
              -q m -a G -n c asus_eee_pc_1215p
    Profile check complete, peak err = 9.771535, avg err = 3.383640, RMS = 4.094142

The parameters used to generate the ICC color profile are fairly conservative and should be fairly robust. They will likely provide good results for most use-cases. If you’re after better accuracy you may want to try replacing -a G with -a S or even -a s, but I very strongly recommend starting out using -a G.

You can inspect the contents of a standardized ICC (version 2 only) color profile using argyll’s [iccdump](http://argyllcms.com/doc/iccdump.html):

    $ iccdump -v 3 asus_eee_pc_1215p.icc

To try the color profile we just generated we can quickly load it using argyll’s [dispwin](http://argyllcms.com/doc/dispwin.html):

    $ dispwin -I asus_eee_pc_1215p.icc

Now you’ll likely see a color shift toward the yellow side. For some possibly aged displays you may notice it shifting toward the blue side.

If you’ve used a colorimeter (as opposed to a spectrophotometer) to profile your display and if you feel the profile might be off, you may want to consider reading [this](http://argyllcms.com/doc/WideGamutColmters.html) and [this](http://argyllcms.com/doc/CrushedDisplyBlacks.html).



## Report On The Calibrated Display

Next we can use argyll’s [dispcal](http://www.argyllcms.com/doc/dispcal.html) again to check our newly calibrated display:

    $ dispcal -H -y l -r
    Current calibration response:
    Black level = 0.3432 cd/m^2
    50%   level = 40.44 cd/m^2
    White level = 179.63 cd/m^2
    Aprox. gamma = 2.15
    Contrast ratio = 523:1
    White     Visual Daylight Temperature = 6420K, DE 2K to locus =  1.9

Here we see the calibrated displays whitepoint nicely around 6500K as it should be.



## Loading The Profile In Your User Session

If your desktop environment is XDG [autostart](http://standards.freedesktop.org/autostart-spec/autostart-spec-latest.html) compliant, you may want to considering creating a .desktop file which will load the ICC color profile during all users session login:

    $ cat /etc/xdg/autostart/dispwin.desktop
    [Desktop Entry]
    Encoding=UTF-8
    Name=Argyll dispwin load color profile
    Exec=dispwin -I /usr/share/color/icc/asus_eee_pc_1215p.icc
    Terminal=false
    Type=Application
    Categories=

Alternatively you could use [colord](http://www.freedesktop.org/software/colord/) and [xiccd](https://github.com/agalakhov/xiccd) for a more sophisticated setup. If you do make sure you have recent versions of both, particularly for [xiccd](https://github.com/agalakhov/xiccd) as it’s still a fairly young project.

First we’ll need to start [xiccd](https://github.com/agalakhov/xiccd) (in the background), which detects your connected displays and adds it to [colord](http://www.freedesktop.org/software/colord/)‘s device inventory:

    $ nohup xiccd &

Then we can query [colord](http://www.freedesktop.org/software/colord/) for its list of available devices:

    $ colormgr get-devices

Next we need to query [colord](http://www.freedesktop.org/software/colord/) for its list of available profiles (or alternatively search by a profile’s full filename):

    $ colormgr get-profiles
    $ colormgr find-profile-by-filename /usr/share/color/icc/asus_eee_pc_1215p.icc

Next we’ll need to assign our profile’s object path to our display’s object path:

    $ colormgr device-add-profile \
       /org/freedesktop/ColorManager/devices/xrandr_HSD121PHW1_70842_pmjdebruijn_1000 \
       /org/freedesktop/ColorManager/profiles/icc_e7fc40cb41ddd25c8d79f1c8d453ec3f

You should notice your displays color shift within a second or so ([xiccd](https://github.com/agalakhov/xiccd) applies it asynchronously), assuming you haven’t already applied it via [dispwin](http://www.argyllcms.com/doc/dispwin.html) earlier (in which case you’ll notice no change).

If you suspect [xiccd](https://github.com/agalakhov/xiccd) isn’t properly working, you may be able to debug the issue by stopping all [xiccd](https://github.com/agalakhov/xiccd) background processes, and starting it in debug mode in the foreground:

    $ killall xiccd
    $ G_MESSAGES_DEBUG=all xiccd

Also in [xiccd](https://github.com/agalakhov/xiccd)‘s case you’ll need to create a .desktop file to load [xiccd](https://github.com/agalakhov/xiccd) during all users session login:

    $ cat /etc/xdg/autostart/xiccd.desktop
    [Desktop Entry]
    Encoding=UTF-8
    Name=xiccd
    GenericName=X11 ICC Daemon
    Comment=Applies color management profiles to your session
    Exec=xiccd
    Terminal=false
    Type=Application
    Categories=
    OnlyShowIn=XFCE;

You’ll note that [xiccd](https://github.com/agalakhov/xiccd) does not need any parameters, since it will query [colord](http://www.freedesktop.org/software/colord/)‘s database what profile to load.

If your desktop environment is not XDG autostart compliant, you need to ask them how to start custom commands ([dispwin](http://www.argyllcms.com/doc/dispwin.html) or [xiccd](https://github.com/agalakhov/xiccd) respectively) during session login.



## Dual Screen Caveats

Currently having a dual screen color managed setup is complicated at best. Most programs use the [_ICC_PROFILE](http://www.burtonini.com/computing/x-icc-profiles-spec-0.1.html) atom to get the system display profile, and there’s only one such atom. To resolve this issue [new atoms](http://www.oyranos.org/wiki/index.php?title=ICC_Profiles_in_X_Specification_0.4) were defined to support multiple displays, but not all applications actually honor them. So with a dual screen setup there is always a risk of applications applying the profile for your first display to your second display or vice versa.

So practically speaking, if you need a _reliable_ color managed setup, you should probably avoid dual screen setups altogether.

That said, most of argyll’s commands support a -d parameter for selecting which display to work with during calibration and profiling, but I have no personal experience with them whatsoever, since I purposefully don’t have a dual screen setup.



## Application Support Caveats

As my other [article](https://encrypted.pcode.nl/blog/2012/01/29/color-management-on-linux/) explains display color profiles consist of two parts, one part (whitepoint &amp; gamma correction) is applied via X11 and thus benefits all applications. There is however a second part (gamut correction) that needs to be applied by the application. And application support for both input and display color management vary wildly. Many consumer grade applications have no color management awareness whatsoever.

Firefox can do color management and it’s half-enabled by default, read [this](https://encrypted.pcode.nl/blog/2013/12/17/firefox-and-color-management/) to properly configure Firefox.

GIMP for example has display color management disabled by default, you need to enable it via its preferences.

Eye of GNOME has display color management enabled by default, but it has nasty corner case behaviors, for example when a file has no metadata no color management is done at all (instead of assuming sRGB input). Some of these issues seem to have been resolved on Ubuntu Trusty ([LP #272584](https://bugs.launchpad.net/ubuntu/+source/eog/+bug/272584)).

Darktable has display color management enabled by default and is one of the few applications which directly support [colord](http://www.freedesktop.org/software/colord/) and the display specific atoms as well as the generic \_ICC_PROFILE atom as fallback. There are however a few caveats for darktable as well, documented [here](http://www.darktable.org/2013/05/display-color-management-in-darktable/).

---

<small style='color:#aaa;'>_This article by [Pascal de Bruijn][pascal] was originally [published on his site][pcode] and is reproduced here with permission._</small>

[pcode]: https://encrypted.pcode.nl/blog/2013/11/24/display-color-profiling-on-linux/
[pascal]: https://encrypted.pcode.nl/
