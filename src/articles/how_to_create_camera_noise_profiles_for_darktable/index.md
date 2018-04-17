---
date: 2018-04-15T19:00:07-05:00
title: "How to create camera noise profiles for darktable"
sub-title: "An easy way to create correct profiling pictures"

lede-img: "noise_example_shot.jpg"
lede-attribution: "by <a href='https://pixelbook.org'>Andreas Schneider</a>"

author: "Andreas Schneider" #required
author-img: "asn.png"
author-url: "https://pixelbook.org"
author-twitter: "@cryptomilk"
author-gplus: ""
author-fb: ""
author-bio: "I'm a <a href='https://blog.cryptomilk.org'>Free and Open Source Software Hacker</a> who loves climbing, cycling and photography."

collection: tutorial
tags:
    - darktable
    - noise
    - noise profiling
    - denoise
    - camera support
stylesheet: noise-profile-darktable

type: "article"
layout: article.hbt
#nodiscuss: false

---

Noise in digital images is similar to film grain in analogue photography.  In
digital cameras, noise is either created by the amplification of digital
signals or heat produced by the sensor. It appears as random, colored speckles
on an otherwise smooth surface and can significantly degrade image quality.

Noise is always present, and if it gets too pronounced, it detracts from the
image and needs to be mitigated. Removing noise can decrease image quality or
sharpness. There are different algorithms to reduce noise, but the best option
is if having profiles for a camera to understand the noise patterns a camera
model produces.

Noise reduction is an image restoration process. You want to remove the digital
artefacts from the image in such a way that the original image is discernible.
These artefacts can be just some kind of grain (luminance noise) or colorful,
disturbing dots (chroma noise). It can either add to a picture or detract from
it. If the noise is disturbing, we want to remove it. The following pictures
show a picture with noise and a denoised version:

<figure>
<img src="example_noise.jpg" alt="Noisy cup" title="Image with noise" width="760" height="507">
<img src="example_denoised.jpg" alt="Denoised cup" title="Denoised image" width="760" height="507">
</figure>

To get the best noise reduction, we need to generate noise profiles for each
ISO value for a camera.


Creating the pictures for noise profling
----------------------------------------

For every ISO value your camera has, you have to take a picture. The pictures
need to be exposed a particular way to gather the information correctly. The
photos need to be out of focus with a widespread histogram like in the
following image:

<figure>
<img src="histogram.png" alt="Histogram" width="516" height="271">
</figure>

We need overexposed and underexposed areas, but mostly particularly the grey
areas in between. These areas contain the information we are looking for.

Let's go through the noise profile generation step by step. For easier creation
of the required pictures, we will create a stencil which will make it easier to
capture the photos.


### Stencil for DSLM/DSLR lenses

You need to get some thicker black paper or cardboard. No light should shine
through it!  First we need to use the lens hood to get the size. The lens hood
helps to move the paper away from the lens a bit and the lens hood gives us
something to attach it to. Then we need to create a punch card. For wide angle
lenses you need a close raster and for longer focal lengths, a wider raster. It
is harder to create it for compact cameras with small lenses (check below).

Find the middle and mark the size of the lens hood:

<figure>
<img src="stencil_step1.jpg" alt="Stencil Step 1" width="760" height="507">
</figure>

If you have the size, draw a grid on the paper:

<figure>
<img src="stencil_step2.jpg" alt="Stencil Step 2" width="760" height="507">
</figure>

Once you have done that you need to choose a punch card raster for your focal
length. I use a 16mm wide angle lens on a full frame body, so I choose a raster
with a lot of holes:

<figure>
<img src="stencil_step3.jpg" alt="Stencil Step 3" width="760" height="507">
</figure>

**Untested**: For a 85mm lens I think you just need holes created with a needle
around the middile. I haven't tested this yet as I don't have the lens yet.


### Stencil for compact cameras

I guess you would create a stencil, like for bigger lenses, but create a funnel
to the camera. Contributions and ideas are welcome!


Taking the pictures
-------------------

Wait for a cloudy day with thick clouds and no sun to take the pictures. The
problem is the shutter speed and it is likely that you'll hit the limit. My
camera has 37 ISO values (including extended iso), so I need to start with 0.6
seconds exposure time to take the last picture with the limit of my camera,
1/8000 of a second exposure time. So a darker day helps to start with a slow
shutter speed.

Use a tripod and point the camera to the sky, attach the lens hood and put the
punch card on it. Better make sure that all filters are removed, so we don't
get any strange artefacts. In the end the setup should look like this:

<figure>
<img src="creating_noise_photo.jpg" alt="Punch card on camera" title="Example setup" width="400" height="600">
</figure>

Choose the fastest aperture available on your lens (e.g. f/2.8 or even faster),
change the camera to manual focus, and focus on infinity. Take the shot!  The
result should look like this:

<figure>
<img src="noise_example_shot.jpg" alt="punch card picture" title="Probably exposed punch card picture" width="760" height="505">
</figure>

The holes will overexpose the picture, but you also need an underexposed area.
So start to put most of my dark areas in the middle of the histogram and moved
it to the black (left) side of the histogram until the first values start to
clip. It is important to not to clip to much, as we are mostly interested the
grey values between the overexposed and underexposed areas.

Once you're done taking the pictures it is time to move to the computer.


Creating the noise profiles
---------------------------

### STEP 1

Run

    /usr/lib/darktable/tools/darktable-gen-noiseprofile --help

If this gives you the help of the tool, continue with STEP 2 othersise go to STEP 1a

### STEP 1a

Your darktable installation doesn't offer the noise tools so you need to
compile it yourself. Before you start make sure that you have the following
dependencies installed on your system:

* git
* gcc
* make
* gnuplot
* darktable-cli

Get the darktable source code using git:

    git clone https://github.com/darktable-org/darktable.git

Now change to the source and build the tools for creating noise profiles using:

    mkdir build
    cd build
    cmake -DCMAKE_INSTALL_PREFIX=/opt/darktable -DBUILD_NOISE_TOOLS=ON ..
    cd tools/noise
    make
    sudo make install

### STEP 2

Download the pictures from your camera and change to the directory on the
commandline:

    cd /path/to/noise_pictures

and run the following command:

    /usr/lib/darktable/tools/darktable-gen-noiseprofile -d $(pwd)

or if you had to download and build the source, run:

    /opt/darktable_source/lib/tools/darktable-gen-noiseprofile -d $(pwd)

This will automatically do everything for you. Note that this can take quite
some time to finish. I think it took 15 to 20 minutes on my machine. If a
picture is not shot correctly, the tool will tell you the image name and you
have to recapture the picture with that ISO.


The tool will tell you, once completed, how to test and verify the
noise profiles you created.

Once the tool finished, you end up with a tarball you can send to darktable for
inclusion. You can open a bug at:

[**https://redmine.darktable.org/**](https://redmine.darktable.org)

The interesting files are the `presets.json` file (darktable input) and, for the
developers, the noise_result.pdf file. You can find an example PDF 
[here](ilce-7m3_noise_result.pdf). It is a
collection of diagrams showing the histogram for each picture and the results
of the calculations.

A detailed explanation of the diagrams and the math behind it can be found in
[the original noise profile
tutorial](https://www.darktable.org/2012/12/profiling-sensor-and-photon-noise/)
by Johannes Hanika.


For discussion
--------------

I've created the stencil above to make it easier to create noise profiles.
However I've tried different ways to create the profiles and here is one which
was a good idea but failed for low ISO values (ISO <= 320). We are in the open
source world, and I think it is important to share failures too. Others may
have an idea to improve it or at least learn from it.

For a simpler approach than the one described above, I've created a [gradient
from black to white](noise_profile.png). Then I used some black cardboard to
attached it to the monitor to get some real black.  Remember you need an
underexposed area and the monitor is not able to output real black, as it is
backlit.

In the end my setup looked liked this:

![Gradient on Monitor](camera_setup_monitor_gradient.jpg)

I've turned off the lights and took the shots. However the results for ISO
values below and equal to ISO320 are not good. All other ISO values looked
fine.

If you're interested in the results, you can find them here:

* [noise_profile.pdf](ilce-7m3_failed_monitor_gradient_noise_result.pdf)
* [dt-noiseprofile.tar.gz](ilce-7m3_failed_monitor_gradient_dt-noiseprofile-20180407.tar.gz)

Please also share pictures of working stencils you created.

Feedback is very much welcome in the comments below!
