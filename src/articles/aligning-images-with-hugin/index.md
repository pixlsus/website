---
date: 2016-09-01
title: "Aligning Images with Hugin"
sub-title: "Easily process your bracketed exposures"

lede-img: ""
lede-attribution:

author: "" #required
author-img: ""
author-url: ""
author-twitter: ""
author-gplus: ""
author-fb: ""
author-bio: ""
type: "article"
collection: tutorial
tags:
    - Hugin
    - EXR
    - Stacking
    - Alignment
    - HDR
stylesheet: index.css
layout: article.hbt
#nodiscuss: true
---

[Hugin](http://hugin.sourceforge.net/) is an excellent tool for for aligning and stitching images. In this article, we'll focus on aligning a stack of images. Aligning a stack of images can be useful for achieving several results, such as:
- bracketed exposures to make an HDR or fused exposure (using enfuse/enblend), or manually blending the images together in an image editor
- photographs taken at different focal distances to extend the depth of field, which can be very useful when taking macros
- photographs taken over a period of time to make a time-lapse movie

For the example images included with this tutorial, the *focal length* is **12mm** and the *focal length multiplier* is **1**. A big thank you to [@isaac](https://discuss.pixls.us/users/isaac/activity) for providing these images.

These instructions were adapted from the [original forum post](https://discuss.pixls.us/t/only-a-small-testimony/2130/5) by [@Carmelo_DrRaw](https://discuss.pixls.us/users/Carmelo_DrRaw/activity); many thanks to him as well.

1. Select **Interface** → **Expert** to set the  interface to **Expert** mode. This will expose all of the options offered by Hugin.
1. Select the **Add images...** button to load your bracketed images. Select your images from the file chooser dialog and click **Open**.
1. Set the *Stack Size* by highlighting all the images, right click and select **Stack** → **Set stack size**. The size of the stack is the number of shots in your bracket. In this case, it is **3**.

	<figure class="big-vid">
      <a href="set_stack_size_hugin.png">
        <img src="set_stack_size_hugin.png">
      </a>
    </figure>
1. Set the optimal setting for aligning images:
  - Feature Matching Settings: Align image stack
  - Optimize Geometric: Custom parameters
  - Optimize Photometric: Low dynamic range
1. Select the **Optimizer** tab.
1. In the **IMage Orientation** section, select the following variables for each image:
  - Roll
  - X (TrX) [horizontal translation]
  - Y (TrY) [vertical translation]

  You can `Ctrl` + left mouse click to enable or disable the variables.

  <figure class="big-vid">
    <a href="roll_x_y_hugin.png">
      <img src="roll_x_y_hugin.png">
    </a>
  </figure>
1. Select **Optimize now!** and wait for the software to finish the calculations. Select **Yes** to apply the changes.
1. Select the **Stitcher** tab.
1. Select the **Calculate Field of View** button.
1. Select the **Calculate Optimal Size** button.
1. Select the **Fit Crop to Images** button.
1. To have the maximum number of post-processing options, select the following image outputs:
  - Panorama Outputs: Exposure fused from any arrangement
    - Format: TIFF
	- Compression: LZW
  - Panorama Outputs: High dynamic range
    - Format: EXR
  - Remapped Images: No exposure correction, low dynamic range

	<figure class="big-vid">
      <a href="image_export_hugin.png">
        <img src="image_export_hugin.png">
      </a>
    </figure>
1. Select the **Stitch!** button and choose a place to save the files. Since Hugin generates quite a few temporary images, save the PTO file in it's own folder.

Hugin will output the following images:
- a tif file blended by enfuse/enblend
- an HDR image in the EXR format
- the individual images after remapping and without any exposure correction that you can import into the GIMP as layers and blend manually.

With the output images, you can:
- edit the enfuse/enblend tif file further in the GIMP or RawTherapee
- tone map the EXR file in LuminanceHDR
- manually blend the remapped tif files in the GIMP or PhotoFlow
