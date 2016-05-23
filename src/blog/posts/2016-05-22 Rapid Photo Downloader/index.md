---
date: 2016-05-22
title: New Rapid Photo Downloader
sub-title: Damon Lynch brings us a new release!

lede-img: about.jpg 
lede-img-thumb: th_about.jpg
lede-attribution: "<a href='http://www.damonlynch.net/'>Damon Lynch</a>"

author: Pat David
author-img: 
author-bio: "I <a href='http://blog.patdavid.net'>write</a> things.<br>I <a href='http://www.flickr.com/photos/patdavid'>photograph</a> things.<br>Sometimes they <a href='https://pixls.us'>meet</a>."

collection: blogposts
template: blog-posts.hbt
---

Community member [Damon Lynch][] happens to make an awesome program called [Rapid Photo Downloader][RPD] in his "spare" time.  In fact you may have heard mention of it as part of [Riley Brandt's][riley] [_"The Open Source Photography Course"_][ospc]<sup>*</sup>.  It is a program that specializes in downloading photo and video from media in as efficient a manner as possible while extending the process with extra functionality.

<small><sup>*</sup> Riley donates a portion of the proceeds from his course to various projects, and Rapid Photo Downloader is one of them!</small>

<!-- more -->


## Work Smart, not Dumb
The main features of Rapid Photo Downloader are listed on the website:

1. Generates meaningful, user configurable [file and folder names][]
2. Downloads photos and videos from multiple devices [simultaneously][]
3. [Backs up][] photos and videos as they are downloaded
4. Is carefully optimized to download and back up at [high speed][]
5. [Easy][] to configure and use
6. [Runs][] under Unity, Gnome, KDE and other Linux desktops
7. Available in [thirty][] languages
8. Program configuration and use is [fully documented][]

[file and folder names]: http://www.damonlynch.net/rapid/features.html#generate
[simultaneously]: http://www.damonlynch.net/rapid/features.html#download
[Backs up]: http://www.damonlynch.net/rapid/features.html#backup
[high speed]: http://www.damonlynch.net/rapid/features.html#download
[Easy]: http://www.damonlynch.net/rapid/features.html#easy
[Runs]: http://www.damonlynch.net/rapid/features.html#gnomekde
[thirty]: http://www.damonlynch.net/rapid/features.html#languages
[fully documented]: http://www.damonlynch.net/rapid/documentation

Damon [announced his 0.9.0a1 release on the forums][0901a], and Riley Brandt even recorded a short overview of the new features:

[0901a]: https://discuss.pixls.us/t/rapid-photo-downloader-0-9-0a1-is-now-released/1416

<div class="fluid-vid">
<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/7D0Fz6H3R34?rel=0" frameborder="0" allowfullscreen></iframe>
</div>

(Shortly after announcing the 0.9.0a1 release, he [followed it up with a 0.9.0a2 release][090a2] with some bug fixes).

Some of the neat new features include being able to preview the download subfolder and storage space of devices _before_ you download:

<figure>
<img src='mainwindow.png' alt='Rapid Photo Downloader Main Window'>
</figure>

Also being able to download from multiple devices in parallel, including from all cameras supported by [gphoto2][]:

<figure>
<img src='downloading.png' alt='Rapid Photo Downloader Downloading'>
</figure>

There is much, much more in this release.  Damon goes into much further detail on [his post in the forum][0901a], copied here:

---
How about its **Timeline**, which groups photos and videos based on how much time elapsed between consecutive shots. Use it to identify photos and videos taken at different periods in a single day or
over consecutive days.

You can adjust the time elapsed between consecutive shots that is used to build the Timeline to match your shooting sessions.

<figure>
<img src='timeline.png' alt='Rapid Photo Downloader timeline'>
</figure>

How about a modern look?

<figure>
<img src='about.png' alt='Rapid Photo Downloader about'>
</figure>

Download instructions: http://damonlynch.net/rapid/download.html

For those who've used the older version, I'm copying and pasting from the ChangeLog, which covers most but not all changes:

- New features compared to the previous release, version 0.4.11:

  - Every aspect of the user interface has been revised and modernized.

  - Files can be downloaded from all cameras supported by gPhoto2,
    including smartphones. Unfortunately the previous version could download
    from only some cameras.

  - Files that have already been downloaded are remembered. You can still select
    previously downloaded files to download again, but they are unchecked by
    default, and their thumbnails are dimmed so you can differentiate them
    from files that are yet to be downloaded.

  - The thumbnails for previously downloaded files can be hidden.

  - Unique to Rapid Photo Downloader is its Timeline, which groups photos and
    videos based on how much time elapsed between consecutive shots. Use it
    to identify photos and videos taken at different periods in a single day
    or over consecutive days. A slider adjusts the time elapsed between
    consecutive shots that is used to build the Timeline. Time periods can be
    selected to filter which thumbnails are displayed.

  - Thumbnails are bigger, and different file types are easier to
    distinguish.

  - Thumbnails can be sorted using a variety of criteria, including by device
    and file type.

  - Destination folders are previewed before a download starts, showing which
    subfolders photos and videos will be downloaded to. Newly created folders
    have their names italicized.

  - The storage space used by photos, videos, and other files on the devices
    being downloaded from is displayed for each device. The projected storage
    space on the computer to be used by photos and videos about to be
    downloaded is also displayed.

  - Downloading is disabled when the projected storage space required is more
    than the capacity of the download destination.

  - When downloading from more than one device, thumbnails for a particular
    device are briefly highlighted when the mouse is moved over the device.

  - The order in which thumbnails are generated prioritizes representative
    samples, based on time, which is useful for those who download very large
    numbers of files at a time.

  - Thumbnails are generated asynchronously and in parallel, using a load
    balancer to assign work to processes utilizing up to 4 CPU cores.
    Thumbnail generation is faster than the 0.4 series of program
    releases, especially when reading from fast memory cards or SSDs.
    (Unfortunately generating thumbnails for a smartphone's photos is painfully
    slow. Unlike photos produced by cameras, smartphone photos do not contain
    embedded preview images, which means the entire photo must be downloaded
    and cached for its thumbnail to be generated. Although Rapid Photo Downloader
    does this for you, nothing can be done to speed it up).

  - Thumbnails generated when a device is scanned are cached, making thumbnail
    generation quicker on subsequent scans.

  - Libraw is used to render RAW images from which a preview cannot be extracted,
    which is the case with Android DNG files, for instance.

  - [Freedesktop.org][] thumbnails for RAW and TIFF photos are generated once they
    have been downloaded, which means they will have thumbnails in programs like
    Gnome Files, Nemo, Caja, Thunar, PCManFM and Dolphin. If the path files are being
    downloaded to contains symbolic links, a thumbnail will be created for the
    path with and without the links. While generating these thumbnails does slow the
    download process a little, it's a worthwhile tradeoff because Linux desktops
    typically do not generate thumbnails for RAW images, and thumbnails only for
    small TIFFs.

  - The program can now handle hundreds of thousands of files at a time.
    
  - Tooltips display information about the file including name, modification
    time, shot taken time, and file size.
    
  - Right click on thumbnails to open the file in a file browser or copy the
    path.
    
  - When downloading from a camera with dual memory cards, an emblem beneath the
    thumbnail indicates which memory cards the photo or video is on

  - Audio files that accompany photos on professional cameras like the Canon
    EOS-1D series of cameras are now also downloaded. XMP files associated with
    a photo or video on any device are also downloaded.

  - Comprehensive log files are generated that allow easier diagnosis of
    program problems in bug reports. Messages optionally logged to a
    terminal window are displayed in color.

  - When running under [Ubuntu][]'s Unity desktop, a progress bar and count of files
    available for download is displayed on the program's launcher.

  - Status bar messages have been significantly revamped.

  - Determining a video's  correct creation date and time has  been improved, using a
    combination of the tools [MediaInfo][] and [ExifTool][]. Getting the right date and time
    is trickier than it might appear. Depending on the video file and the camera that
    produced it, neither MediaInfo nor ExifTool always give the correct result.
    Moreover some cameras always use the UTC time zone when recording the creation
    date and time in the video's metadata, whereas other cameras use the time zone
    the video was created in, while others ignore time zones altogether.

  - The time remaining until a download is complete (which is shown in the status
    bar) is more stable and more accurate. The algorithm is modelled on that
    used by Mozilla Firefox.

  - The installer has been totally rewritten to take advantage of [Python][]'s
    tool pip, which installs Python packages. Rapid Photo Downloader can now
    be easily installed and uninstalled. On [Ubuntu][], [Debian][] and [Fedora][]-like
    Linux distributions, the installation of all dependencies is automated.
    On other Linux distrubtions, dependency installation is partially
    automated.

  - When choosing a Job Code, whether to remember the choice or not can be
    specified.

- Removed feature:

  - Rotate Jpeg images - to apply lossless rotation, this feature requires the
    program jpegtran. Some users reported jpegtran corrupted their jpegs' 
    metadata -- which is bad under any circumstances, but terrible when applied
    to the only copy of a file. To preserve file integrity under all circumstances,
    unfortunately the rotate jpeg option must therefore be removed.
  
- Under the hood, the code now uses:

  - PyQt 5.4 +

  - gPhoto2 to download from cameras

  - Python 3.4 +

  - ZeroMQ for interprocess communication

  - GExiv2 for photo metadata

  - Exiftool for video metadata

  - Gstreamer for video thumbnail generation

- Please note if you use a system monitor that displays network activity,
  don't be alarmed if it shows increased local network activity while the
  program is running. The program uses ZeroMQ over TCP/IP for its
  interprocess messaging. Rapid Photo Downloader's network traffic is
  strictly between its own processes, all running solely on your computer.
  
- Missing features, which will be implemented in future releases:
 
  - Components of the user interface that are used to configure file
    renaming, download subfolder generation, backups, and miscellaneous
    other program preferences. While they can be configured by manually
    editing the program's configuration file, that's far from easy and is
    error prone. Meanwhile, some options can be configured using the command
    line.

  - There are no full size photo and video previews.
  
  - There is no error log window.

  - Some main menu items do nothing.

  - Files can only be copied, not moved.


---

Of course, Damon doesn't sit still.  He quickly followed up the 0.9.0a1 announcement by [announcing 0.9.0a2][090a2] which included a few bug fixes from the previous release:

- Added command line option to import preferences from from an old program
  version (0.4.11 or earlier).

- Implemented auto unmount using GIO (which is used on most Linux desktops) and
  UDisks2 (all those desktops that don't use GIO, e.g. KDE). 

- Fixed bug while logging processes being forcefully terminated.

- Fixed bug where stored sequence number was not being correctly used when
  renaming files.

- Fixed bug where download would crash on Python 3.4 systems due to use of Python
  3.5 only math.inf

---

If you've been considering optimizing your workflow for photo import and initial sorting now is as good a time as any - particularly with all of the great new features that have been packed into this release!  Head on over to the [Rapid Photo Downloader][RPD] website to have a look and see the instructions for getting a copy:

http://damonlynch.net/rapid/download.html

Remember, this is _Alpha_ software still (though most of the functionality is all in place).  If you do run into any problems, please drop in and let Damon know in [the forums][090a2]!

<style>
ol { max-width: 32rem; margin:0 auto; }
</style>

[Damon Lynch]: http://www.damonlynch.net
[RPD]: http://www.damonlynch.net/rapid/
[riley]: http://www.rileybrandt.com/
[ospc]: http://www.rileybrandt.com/lessons/
[gphoto2]: http://gphoto.sourceforge.net/
[Freedesktop.org]: https://www.freedesktop.org/wiki/
[MediaInfo]: https://mediaarea.net/en/MediaInfo
[ExifTool]: http://www.sno.phy.queensu.ca/~phil/exiftool/
[Python]: https://www.python.org/
[Ubuntu]: http://www.ubuntu.com/
[Debian]: https://www.debian.org/
[Fedora]: https://getfedora.org/
[090a2]: https://discuss.pixls.us/t/rapid-photo-downloader-0-9-0a2-is-released/1424
