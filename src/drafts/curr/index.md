---
date: 2017-03-23T13:51:36-06:00 

title: RawTherapee and Pentax Pixel Shift
sub-title: Supporting multi-file raw formats

lede-img: 'null.jpg'
lede-style: 'background-color: white; background-position: 0;'
lede-attribution: "by Someone"

author: "Pat David" #required
author-img: ""
author-url: "http://blog.patdavid.net"
author-twitter: "@patdavid"
author-bio: "I <a href='http://blog.patdavid.net'>write</a> things.<br>I <a href='http://www.flickr.com/photos/patdavid'>photograph</a> things.<br>Sometimes they <a href='//pixls.us'>meet</a>."

type: 'article'

layout: article.hbt
#nodiscuss: true

---

## What is Pixel Shift?

Modern digital sensors (with a few exceptions) use an arrangement of RGB filters over a square grid of photosensors.  For a given 2x2 square of photosensors the filters are designed to allow two green, and one each red and blue colors through to the photosite.  These are arranged on a grid:


<figure>
<a title="By en:User:Cburnett, CC-BY-SA-3.0 or GPL, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File%3ABayer_pattern_on_sensor.svg">
<img width="512" alt="Bayer pattern on sensor" src="512px-Bayer_pattern_on_sensor.svg.png" height='333'/>
</a>
</figure>

The pattern is known as a [Bayer pattern][bayer] (after the creator Bryce Bayer of Eastman Kodak).  The resulting pattern shows how each RGB is offset into the grid.

[bayer]: https://en.wikipedia.org/wiki/Bayer_filter


<figure>
<a title="By en:User:Cburnett, CC-BY-SA-3.0 or GPL, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File%3ABayer_pattern_on_sensor_profile.svg">
<img alt="Bayer pattern on sensor profile" src="Bayer_pattern_on_sensor_profile.svg.png" width='512' height='328' />
</a>
</figure>

Each of the pixel sites are only capturing a single color, though.  In order to produce a full color representation at each pixel, the other color values need to be interpolated from the surrounding grid.  This interpolation and methods for calculating it is referred to as [demosaicing](https://en.wikipedia.org/wiki/Demosaicing). The methods for accomplishing this vary across different algorithms.

<figure>
<img src="bayer-interp.png" width="250" height="250">
<figcaption>
The final RGB value for the initially Red pixel needs to be interpolated from the surrounding Blue and Green pixels.
</figcaption>
</figure>



### Pixel Shift

Pentax's Pixel Shift (Available on the [K-1][k1], [K-3 II][k3], [K-p][kp], [K-70][k70]) attempts to alleviate some of these problems through a novel approach of capturing four images quickly in succession and moving the entire camera sensor by a single pixel for each shot.  This has the effect of capturing a full RGB value at each pixel location:

[k1]: http://www.ricoh-imaging.co.jp/english/products/k-1/
[k3]: http://www.ricoh-imaging.co.jp/english/products/k-3-2/
[kp]: http://www.ricoh-imaging.co.jp/english/products/kp/
[k70]: http://www.ricoh-imaging.co.jp/english/products/k-70/


<figure>
<img src="pixel-shift-example.png" width="283" height="999">
<figcaption>
Pixel Shift shifts the sensor by one pixel in each direction to be able to generate a full set of RGB values at each photosite.
</figcaption>
</figure>


This means a full RGB value for a pixel location can be created without having to interpolate from neighboring values.

### Advantages

#### Less Noise

 If you look carefully at the Bayer pattern, you'll notice that when shifting to adjacent pixels there will always be two green values captured per pixel.  The average of these green values helps to suppress noise that may have been interpolated and spread through a normal, single shot raw file.

<figure>
<img src="ps-adv-noise.png" width="640" height="640">
<figcaption>
Top: single raw frame, Bottom: Pixel Shift
</figcaption>
</figure>

#### Less Moire

Avoiding the interpolation of pixel colors from surrounding photosites helps to reduce the appearance of Moire in the final result:
 
<figure>
<img src="ps-adv-moire.png" width="640" height="640">
<figcaption>
Top: single raw frame, Bottom: Pixel Shift
</figcaption>
</figure>


#### Increased Resolution

This method is similar in concept to what was previously seen when Olympus announced their "High Resolution" mode for the OMD E-M5mkII camera.  In that case they combine 8 frames moved by sub-pixel amounts to increase the overall resolution.  The difference here is that Olympus generates a single, combined raw file from the results, while Pixel Shift gets you access to each of the four raw files before they're combined.

In each case, a higher resolution image can be created from the results:
 
<figure>
<img src="ps-adv-resolution.png" width="640" height="640">
<figcaption>
Top: single raw frame, Bottom: Pixel Shift
</figcaption>
</figure>


### Disadvantages

#### Movement

As with most approaches for capturing multiple images and combining them, a particularly problematic area is when there are objects in motion between the frames being captured.  This is a common problem for panorama photography when stitching the image together, image stacks for noise reduction, as well as image combining methods like Pixel Shift.

Although...



## RawTherapee Approach

Simply combining four static frames together is really trivial, and is something that all the other pixelshift capable software can do without issue. The real world is not often so accommodating as a studio setup, and that is where the recent work done by Ingo and Ilias on RawTherapee really begins to shine.

What they've been working on in RawTherapee is to improve the _detection of movement_ in a scene.  There are several types of movement possible such as

* Objects showing at different places in a scene such as fast moving cars.
* Partly moving objects like foliage in the wind.
* Moving objects reflecting light onto static objects in the scene
* Changing illumination conditions such as long exposures at sunset.

All of these types of movement need to be detected to avoid the artifacts they may cause in the final shot.

One of the key features of Pixel Shift movement detection in RawTherapee is that it allows you to show the movement mask, so you get feedback on which regions of the image are detected as movement and which are static.  For the regions with movement RawTherapee will then use the demosaiced frame of your choice to fill it in, and for regions without movement it will use the Pixel Shift combined image with more detail and less noise.

<figure class='big-vid'>
<img src="movemask.jpg" width='960' height='720'>
<figcaption>
Unique to RawTherapee is the option to export the resulting motion mask  
(for those that may want to do further blending/processing manually).
</figcaption>
</figure>

The accuracy of movement detection in RawTherapee leads to much better handling of motion artifacts that works well in places where proprietary solutions fall short (see below).  For most cases the Automatic motion correction mode works well, but you can also fine tune the parameters in custom mode to correctly detect motion in high ISO shots.

Besides being the only option (barring dcrawps possibly) to process Pixel Shift files in Linux, RawTherapee has some other neat options that aren't found in other solutions. One of them is the ability to export the actual movement mask separate from the image. This will let users generate separate outputs from RT, and to combine them later using the movement mask. Another option is the ability to choose which of the other frames to use for filling in the movement areas on the image.



## A Comparison of Other Software (Processing Pixel Shift)

Pentax has software to process these files, Pentax Digital Camera Utility (SilkyPix), but as with most vendor-bundled software it can be slow, unwieldy, and a little buggy sometimes.  Having said that, the results do look good, and at least the "Motion Correction" is able to be utilized with this software.

Adobe Camera Raw (ACR) got support for Pixel Shift files in version 9.5.1 (but doesn't utilize the "Motion Correction").  In fact, ACR didn't have support at the time that [DPReview.com](https://www.dpreview.com) looked at the feature last year (causing them to retract the article and re-post when they had a chance to use a version of ACR with support).

In a [recent look at Pixel Shift](https://www.dpreview.com/reviews/k1-pixel-shift-resolution-updated-field-test) processing over at DPReview.com, they got some interesting results.  

[issues]: https://www.dpreview.com/reviews/k1-pixel-shift-resolution-updated-field-test#reviewImageComparisonWidget-52182546

<figure>
<img src="IMGP0597.RT-PS-1.jpg" width="640" height="428">
<figcaption>
The image used in the DPReview article. &copy;[Chris M Williams](https://www.dpreview.com/reviews/k1-pixel-shift-resolution-updated-field-test)
</figcaption>
</figure>

We're going to look at some 100% crops from that article and compare them to the results available using recent version of RawTherapee.

Looking first at an area of foliage with motion, the places where there are issues [becomes apparent][issues].

For reference, here is the Adobe Camera Raw (ACR) version of one frame from a Pixel Shift file:

<figure>
<img src="https://pixls-discuss.s3.amazonaws.com/original/2X/e/ed57f97d73ec2dc6f80256a6e8e57bf812682fc0.jpg" width="300" height="200">
</figure>

The results with Pixel Shift on, and motion correction on, from straight-out-of-camera (SOOC), Adobe Camera Raw (ACR), SilkyPix, and RawTherapee (RT) are decidedly mixed.  In all but the RT version, there's a very clear problem with effective blending and masking of the frames in areas with motion:

<figure>
<img src="IMGP0597-Area01-combined.png" width='600' height='400'>
<figcaption>

</figcaption>
</figure>


<!-- 
ACR raw, PS on, motion correction on:
<img src="https://pixls-discuss.s3.amazonaws.com/original/2X/3/3247fa019234363f118b5540e62ba5c4301abaee.jpg" width="300" height="200">

SOOC JPEG, PS on, motion correction on:
<img src="https://pixls-discuss.s3.amazonaws.com/original/2X/5/59345c69231876b1a1ab6a7fa72bfd06cb65a7ae.jpg" width="300" height="200">

SilkyPix raw, PS on, motion correction on:
<img src="https://pixls-discuss.s3.amazonaws.com/original/2X/4/4c42ff212f3f314f6903f8474d835b6ddcb40b7f.jpg" width="300" height="200">

RawTherapee, Pixel Shift on, motion correction off:
<img src="https://pixls-discuss.s3.amazonaws.com/original/2X/5/5414eb5266c5af434d2de0c7a25cce402c300eea.jpg" width="300" height="200">

RawTherapee, Pixel Shift on, motion correction (Auto):
<img src="https://pixls-discuss.s3.amazonaws.com/original/2X/4/46fc93f9a86b99019e0e424b25e2078a6d50c8e9.jpg" width="300" height="200">

-->

---

Things look much worse for Adobe Camera Raw when looking at high-motion areas like the water spray at the foot of the waterfall, though SilkyPix does much better job here.

The ACR version of one frame for reference:

<figure>
<img src="IMGP0597-Area02-ACR-MotionOff.jpg" width="300" height="200">
</figure>

Both the SOOC and SilkyPix versions handle all of the movement well here.  RawTherapee also does a great job blending the frames through all of the movement.  Adobe Camera Raw is not doing well at all...

<figure>
<img src="IMGP0597-Area02-combined.png" width='600' height='400'>
</figure>


<!-- 
ACR raw, PS on, motion correction on:
<img src="https://pixls-discuss.s3.amazonaws.com/original/2X/3/36d3122e6e1147f06dcbbb852a63bd5bdbd11bb1.jpg" width="300" height="200">


SOOC JPEG, PS on, motion correction on:
<img src="https://pixls-discuss.s3.amazonaws.com/original/2X/d/d86dc1ab21a7b32dc7d58e403607d3a65d8a84c9.jpg" width="300" height="200">


SilkyPix raw, PS on, motion correction on:
<img src="https://pixls-discuss.s3.amazonaws.com/original/2X/6/6a32c96b17b362db3ade20a4051a3876382845d4.jpg" width="300" height="200">


RawTherapee, Pixel Shift on, motion correction off:
<img src="https://pixls-discuss.s3.amazonaws.com/original/2X/d/dc92eb0ea095fa8f3c77991f7c7606f44c6e36e8.jpg" width="300" height="200">


RawTherapee, Pixel Shift on, motion correction (Auto):
<img src="https://pixls-discuss.s3.amazonaws.com/original/2X/a/af3cb4da48d8e2c863cfd56148239b7844b48762.jpg" width="300" height="200">

-->


* * *

Finally, in a frame full of movement, such as the surface of the water.

The ACR version of one frame for reference:
<figure>
<img src="https://pixls-discuss.s3.amazonaws.com/original/2X/b/bfd2480b8f2f9467e0e0db33ba8e3791085a7ed3.jpg" width="300" height="200">
</figure>

In a frame full of movement the SOOC, ACR, and SilkyPix processing all struggle to combine a clean set of frames together.  They exhibit a pixel pattern from the processing, and the ACR version begins to introduce odd colors:

<figure>
<img src="IMGP0597-Area03-combined.png" width='600' height='400'>
</figure>

<!-- 
ACR raw, PS on, motion correction on:
<img src="https://pixls-discuss.s3.amazonaws.com/original/2X/3/335f9bbe62026b061fa9d7659913cfc8618b15e3.jpg" width="300" height="200">


SOOC JPEG, PS on, motion correction on:
<img src="https://pixls-discuss.s3.amazonaws.com/original/2X/a/ac50c9893deace74de435236109b8c731ed07087.jpg" width="300" height="200">


SilkyPix raw, PS on, motion correction on:
<img src="https://pixls-discuss.s3.amazonaws.com/original/2X/2/2cf0e46026d9924e6a3ca4bc4f2abcf41e595285.jpg" width="300" height="200">


RawTherapee, Pixel Shift on, motion correction off:
<img src="https://pixls-discuss.s3.amazonaws.com/original/2X/2/21fae3ffbfb2b5c4ffef7343117f55c167d91104.jpg" width="300" height="200">


RawTherapee, Pixel Shift on, motion correction (Auto):
<img src="https://pixls-discuss.s3.amazonaws.com/original/2X/2/2091d26deb3975747350fa611a205653563a4dd6.jpg" width="300" height="200">

-->

As mentioned earlier, a unique feature of RawTherapee is the ability to export the motion mask.  Here is an example of the motion mask for this image (overlayed on the image itself):

<figure>
<img src="IMGP0597.RT-PS-1-masked.jpg" width="640" height="428">
<figcaption>
The motion mask generated by RawTherapee for the above image.
</figcaption>
</figure>


### In Conclusion

In another example of the power and community of Free/Libre and Open Source Software we have a great enhancement to a project based on feedback and input from the users.  In this case, it all started with a [post on our forums](https://discuss.pixls.us/t/support-for-pentax-pixel-shift-files-3489/2560).

Not so coincidentally, community member [@nosle](https://discuss.pixls.us/users/nosle) gave permission to use one of his PS files for everyone to try processing.  You can find the file and everyone's results on the [Play pixelshift thread](https://discuss.pixls.us/t/play-pixelshift/3142).

Pixel Shift is currently in the development branch of RawTherapee and is slated for release with version 5.1.
