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

1. Select **Interface** → **Expert** to set the  interface to **Expert** mode. This will expose all of the options offered by Hugin.
1. Select the **Add images...** button to load your bracketed images. Select your images from the file chooser dialog and click **Open**.
1. Set the optimal setting for aligning images:
  - Feature Matching Settings: Align image stack
  - Optimize Geometric: Custom parameters
  - Optimize Photometric: Low dynamic range
1. Select the **Optimizer** tab.
1. In the **IMage Orientation** section, select the following variables for each image:
  - Roll
  - X (TrX)</span> [horizonal translation]
  - Y (TrY)</span> [vertical translation]

  You can `Ctrl` + left mouse click to enable or disable the variables.
1. Select **Optimize now!** and wait for the software to finish the calculations.
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
1. Select the **Stitch!** button.

Hugin will output a tif file blended by enfuse/enblend, a HDR image in the EXR format, and the individual images after remapping and without any exposure correction that you can import into the GIMP as layers and blend manually.
