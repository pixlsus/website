---
date: 2017-03-24T13:17:10-06:00 

title: RawTherapee and Pentax Pixel Shift
sub-title: Supporting multi-file raw formats

lede-img: 'nosle-lede.jpg'
lede-style: 'background-color: white; background-position: 50%;'
lede-attribution: "by <a href='https://discuss.pixls.us/users/nosle/summary'>@nosle</a>"

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

Modern digital sensors (with a few exceptions) use an arrangement of RGB filters over a square grid of photosites.  For a given 2x2 square of photosites the filters are designed to allow two green, and one each red and blue colors through to the photosite.  These are arranged on a grid:


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

Each of the pixel sites captures a single color.  In order to produce a full color representation at each pixel, the other color values need to be interpolated from the surrounding grid.  This interpolation and methods for calculating it are referred to as [demosaicing](https://en.wikipedia.org/wiki/Demosaicing). The methods for accomplishing this vary across different algorithms.

<figure>
<img src="bayer-interp.png" width="250" height="250" alt='Bayer Interpolation Example'>
<figcaption>
The final RGB value for the initially Red pixel needs to be interpolated from the surrounding Blue and Green pixels.
</figcaption>
</figure>

Unfortunately, this can often result in problems.
There can be chromatic aliasing problems resulting in odd color fringing and roughness on edges or a loss of detail and sharpness.



### Pixel Shift

[Pentax][]'s Pixel Shift (Available on the [K-1][k1], [K-3 II][k3], [KP][kp], [K-70][k70]) attempts to alleviate some of these problems through a novel approach of capturing four images quickly in succession and by moving the entire camera sensor a single pixel for each shot.  This has the effect of capturing a full RGB value at each pixel location:

[Pentax]: http://us.ricoh-imaging.com/
[k1]: http://www.ricoh-imaging.co.jp/english/products/k-1/
[k3]: http://www.ricoh-imaging.co.jp/english/products/k-3-2/
[kp]: http://www.ricoh-imaging.co.jp/english/products/kp/
[k70]: http://www.ricoh-imaging.co.jp/english/products/k-70/


<figure>
<img src="pixel-shift-example.png" width="283" height="999" alt="Pixel Shift Example Diagram">
<figcaption>
Pixel Shift shifts the sensor by one pixel in each direction to be able to generate a full set of RGB values at each photosite.
</figcaption>
</figure>


This means a full RGB value for a pixel location can be created without having to interpolate from neighboring values.

### Advantages

#### Less Noise

If you look carefully at the Bayer pattern, you'll notice that when shifting to adjacent pixels there will always be two green values captured per pixel.  The average of these green values helps to suppress noise that may have been interpolated and spread through a normal, single-shot raw file.

<figure>
<img src="ps-adv-noise.png" width="640" height="640" alt="Pixel Shift Noise Reduction Example">
<figcaption>
Top: single raw frame, Bottom: Pixel Shift
</figcaption>
</figure>

#### Less Moiré 

Avoiding the interpolation of pixel colors from surrounding photosites helps to reduce the appearance of Moiré in the final result:
 
<figure>
<img src="ps-adv-moire.png" width="640" height="640" alt="Pixel Shift Moiré Reduction Example">
<figcaption>
Top: single raw frame, Bottom: Pixel Shift
</figcaption>
</figure>


#### Increased Resolution

This method is similar in concept to what was previously seen when Olympus announced their "High Resolution" mode for the OMD E-M5mkII camera (or manually as we [previously described in this blog post](https://pixls.us/blog/2015/09/softness-and-superresolution/#a-question-of-scaling)).
In that case they combine 8 frames moved by sub-pixel amounts to increase the overall resolution.
The difference here is that Olympus generates a single, combined raw file from the results, while Pixel Shift gets you access to each of the four raw files before they're combined.

In each case, a higher resolution image can be created from the results:
 
<figure>
<img src="ps-adv-resolution.png" width="640" height="640" alt="Pixel Shift Increased Resolution Example">
<figcaption>
Top: single raw frame, Bottom: Pixel Shift
</figcaption>
</figure>


### Disadvantages

#### Movement

As with most approaches for capturing multiple images and combining them, a particularly problematic area is when there are objects in motion between the frames being captured.
This is a common problem when stitching panoramic photography, when creating image stacks for noise reduction, and when combining images using methods such as Pixel Shift.

Although...



## The RawTherapee Approach

Simply combining four static frames together is really trivial, and is something that all the other Pixel Shift-capable software can do without issue. The real world is not often so accommodating as a studio setup, and that is where the recent work done by [@Ingo][] and [@Ilias][] on [RawTherapee][] really begins to shine.

[@Ingo]: https://discuss.pixls.us/users/heckflosse/summary
[@Ilias]: https://discuss.pixls.us/users/ilias_giarimis/summary
[RawTherapee]: http://www.rawtherapee.com

What they've been working on in RawTherapee is to improve the _detection of movement_ in a scene.  There are several types of movement possible: 

* Objects showing at different places in a scene such as fast moving cars.
* Partly moving objects like foliage in the wind.
* Moving objects reflecting light onto static objects in the scene
* Changing illumination conditions such as long exposures at sunset.

All of these types of movement need to be detected to avoid the artifacts they may cause in the final shot.

One of the key features of Pixel Shift movement detection in RawTherapee is that it allows you to show the movement mask, so you get feedback on which regions of the image are detected as movement and which are static.  For the regions with movement RawTherapee will then use the demosaiced frame of your choice to fill it in, and for regions without movement it will use the Pixel Shift combined image with more detail and less noise.

<figure class='big-vid'>
<img src="movemask.jpg" width='960' height='720' alt="Pixel Shift Movement Mask from RawTherapee">
<figcaption>
Unique to RawTherapee is the option to export the resulting motion mask  
(for those that may want to do further blending/processing manually).
</figcaption>
</figure>

The accuracy of movement detection in RawTherapee leads to much better handling of motion artifacts that works well in places where proprietary solutions fall short.
For most cases the Automatic motion correction mode works well, but you can also fine tune the parameters in custom mode to correctly detect motion in high ISO shots.

Besides being the only option (barring [dcrawps][] possibly) to process Pixel Shift files in Linux, RawTherapee has some other neat options that aren't found in other solutions. One of them is the ability to export the actual movement mask separate from the image. This will let users generate separate outputs from RT, and to combine them later using the movement mask. Another option is the ability to choose which of the other frames to use for filling in the movement areas on the image.

[dcrawps]: https://github.com/tomtor/dcrawps



## Pixel Shift Support in Other Software

Pentax's own Digital Camera Utility (a rebranded version of SilkyPix) naturally supports Pixel Shift, but as with most vendor-bundled software it can be slow, unwieldy, and a little buggy sometimes.  Having said that, the results do look good, and at least the "Motion Correction" is able to be utilized with this software.

[Adobe Camera Raw][] (ACR) got support for Pixel Shift files in version 9.5.1 (but doesn't utilize the "Motion Correction").  In fact, ACR didn't have support at the time that [DPReview.com](https://www.dpreview.com) looked at the feature last year, causing them to retract the article and re-post when they had a chance to use a version of ACR with support.

[Adobe Camera Raw]: https://helpx.adobe.com/camera-raw/using/supported-cameras.html


A [recent look at Pixel Shift](https://www.dpreview.com/reviews/k1-pixel-shift-resolution-updated-field-test) processing over at DPReview.com showed some interesting results.

[issues]: https://www.dpreview.com/reviews/k1-pixel-shift-resolution-updated-field-test#reviewImageComparisonWidget-52182546

<figure>
<img src="IMGP0597.RT-PS-1.jpg" width="640" height="428" alt="Sample Image Raw">
<figcaption>
The image used in the DPReview article. &copy;[Chris M Williams](https://www.dpreview.com/reviews/k1-pixel-shift-resolution-updated-field-test)
</figcaption>
</figure>

We're going to look at some 100% crops from that article and compare them to the results available using RawTherapee (the latest development version, to be released as 5.1 in April).
The RawTherapee versions were set to the most neutral settings with only an exposure adjustment to match other samples better.

Looking first at an area of foliage with motion, the places where there are issues [becomes apparent][issues].

For reference, here is the Adobe Camera Raw (ACR) version of a single frame from a Pixel Shift file:

<figure>
<img src="https://pixls-discuss.s3.amazonaws.com/original/2X/e/ed57f97d73ec2dc6f80256a6e8e57bf812682fc0.jpg" width="300" height="200" alt="Pixel Shift Comparison #1">
</figure>

The results with Pixel Shift on, and motion correction on, from straight-out-of-camera (SOOC), Adobe Camera Raw (ACR), SilkyPix, and RawTherapee (RT) are decidedly mixed.  In all but the RT version, there's a very clear problem with effective blending and masking of the frames in areas with motion:

<figure>
<img src="IMGP0597-Area01-combined.png" width='600' height='400' alt="Pixel Shift Comparison #2" >
<figcaption>

</figcaption>
</figure>



* * *

Things look much worse for Adobe Camera Raw when looking at high-motion areas like the water spray at the foot of the waterfall, though SilkyPix does a much better job here.

The ACR version of a single frame for reference:

<figure>
<img src="IMGP0597-Area02-ACR-MotionOff.jpg" width="300" height="200" alt="Pixel Shift Comparison #2">
</figure>

Both the SOOC and SilkyPix versions handle all of the movement well here.  RawTherapee also does a great job blending the frames despite all of the movement.  Adobe Camera Raw is not doing well at all...

<figure>
<img src="IMGP0597-Area02-combined.png" width='600' height='400' alt="Pixel Shift Comparison #2">
</figure>



* * *

Finally, in a frame full of movement, such as the surface of the water.

The ACR version of a single frame for reference:
<figure>
<img src="https://pixls-discuss.s3.amazonaws.com/original/2X/b/bfd2480b8f2f9467e0e0db33ba8e3791085a7ed3.jpg" width="300" height="200" alt="Pixel Shift Comparison #3">
</figure>

In a frame full of movement the SOOC, ACR, and SilkyPix processing all struggle to combine a clean set of frames.  They exhibit a pixel pattern from the processing, and the ACR version begins to introduce odd colors:

<figure>
<img src="IMGP0597-Area03-combined.png" width='600' height='400' alt="Pixel Shift Comparison #3">
</figure>



* * *

As mentioned earlier, a unique feature of RawTherapee is the ability to show the motion mask. Here is an example of the motion mask for this image

<figure>
<img src="IMGP0597.RT-PS-1-masked.jpg" width="640" height="428" alt='Pixel Shift Motion Mask'>
<figcaption>
The motion mask generated by RawTherapee for the above image.
</figcaption>
</figure>

Also worth mentioning is the "Smooth Transitions" feature in RawTherapee.
When there are regions with and without motion, the regions with motion are masked and filled in with data from a demosaiced frame of your choice.
The other regions are taken from the Pixel Shift combined image.
This can occasionally lead to harsh transitions between the two.

For instance, a transition as processed in SilkyPix:

<figure>
<img src="smooth-transition-silkypix.png" width='439' height='568' alt='Pixel Shift Transition SilkyPix'>
</figure>

RawTherapee's "Smooth Transitions" feature does a much better job handling the transition:

<figure>
<img src="smooth-transition-rt.png" width='439' height='568' alt='Pixel Shift Transition RawTherapee'>
</figure>



### In Conclusion

In another example of the power and community of Free/Libre and Open Source Software we have a great enhancement to a project based on feedback and input from the users.  In this case, it all started with a [post on the RawTherapee forums](https://discuss.pixls.us/t/support-for-pentax-pixel-shift-files-3489/2560).

Thanks to the hard work of [@Ingo][] and [@Ilias][] Pentax shooters now have a Pixel Shift capable software that is not only FLOSS but also produces better results than the proprietary solutions!

Not so coincidentally, community member [@nosle](https://discuss.pixls.us/users/nosle) gave permission to use one of his PS files for everyone to try processing on the [Play pixelshift thread](https://discuss.pixls.us/t/play-pixelshift/3142).
If you'd like to practice consider heading over to get his file and feedback from others!

Pixel Shift is currently in the development branch of RawTherapee and is slated for release with version 5.1.
