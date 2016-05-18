---
date: 2016-05-18T10:30:37-06:00 
title: G'MIC 1.7.1
sub-title: When the flowers are blooming, image filters abound!

lede-img: Lede.jpg
lede-img-thumb: th_Lede.jpg

author: David Tschumperlé

collection: blogposts
template: blog-posts.hbt

---

News from the front: G'MIC 1.7.1 released !
---------------------------------------------

A new version **1.7.1** « _Spring 2016_ » of [_G'MIC_](http://gmic.eu) (_GREYC's Magic for Image Computing_),
the open-source framework for image processing, has been released recently (_26 April 2016_).
A great opportunity to summarize some of the latest advances and features of this interesting free software,
done for the last 5 months.

<!-- more -->

# _G'MIC_: A brief overview

[_G'MIC_](http://gmic.eu) is an open-source project started in _August 2008_. It has been developed in the
[_IMAGE_ team](https://www.greyc.fr/image) of the [_GREYC_](https://www.greyc.fr/fr/node/6) laboratory
from the [_CNRS_](http://www.cnrs.fr) (one of the major French public research institute).
This team is made of researchers and teachers specialized in the algorithmic and mathematics of image processing.
_G'MIC_ is released under the free software licence [_CeCILL_](http://www.cecill.info/licences/Licence_CeCILL_V2.1-en.html)
(_GPL_-compatible) for various platforms (_Linux, Mac and Windows_). It provides a set of various user interfaces
for the manipulation of _generic_ image data, that is images or image sequences of
[multispectral data](https://en.wikipedia.org/wiki/Hyperspectral_imaging) being _2D_ or _3D_, and with high-bit precision
(up to 32bits floats per channel). Of course, it manages «classical» color images as well.

![img](http://tschumperle.users.greyc.fr/lfr3/logo_gmic.png)
_Fig.1.1. Logo and (new) mascot of the G'MIC project, the open-source framework for image processing._

Note that the project just got a redesign of its mascot _Gmicky_, drawn by
[_David Revoy_](http://www.davidrevoy.com/static6/about-me), a French illustrator well-known to free graphics lovers for being
responsible for the great libre webcomics [_Pepper&Carott_](http://www.peppercarrot.com/).

_G'MIC_ has been made noted essentially for its [_GIMP_](http://www.gimp.org) [plug-in](http://gmic.eu/gimp.shtml),
first released in _2009_. Today, this popular _GIMP_ extension proposes more than _460_ customizable filters and effects
to apply on your images.

![img](http://tschumperle.users.greyc.fr/lfr3/gmic_gimp171_s.png)
_Fig.1.2. Overview of the G'MIC plug-in for GIMP._

But _G'MIC_ is not a plug-in for GIMP only. It also offers a [command-line interface](http://gmic.eu/reference.shtml), that can
be used in addition with the _CLI_ tools from [_ImageMagick_](http://www.imagemagick.org/) or
[_GraphicsMagick_](http://www.graphicsmagick.org)
(this is undoubtly the most powerful and flexible interface of the framework).
_G'MIC_ also proposes a web service [_G'MIC Online_](https://gmicol.greyc.fr/) to allow applying effects on your images
directly from a web browser. Other _G'MIC_-based interfaces exist ([_ZArt_](https://www.youtube.com/watch?v=k1l3RdvwHeM),
a plug-in for [_Krita_](http://www.krita.org), filters for [_Photoflow_](http://photoflowblog.blogspot.fr/)...) but their use are
a bit more confidential.
All these interfaces are based on the generic _C++_ libraries [_CImg_](http://cimg.eu) and
[_libgmic_](http://gmic.eu/libgmic.shtml) which are portable, thread-safe and multi-threaded
(through the use of [_OpenMP_](http://openmp.org/)).
Today, _G'MIC_ has more than [_900_ functions](http://gmic.eu/reference.shtml) to process images, all being
fully configurable, for a library of only _6 Mio_ and approximately _150 kloc_ of source code.
Its features cover a wide spectrum of the image processing field, with algorithms for
geometric and color manipulations, image filtering (denoising/sharpening with spectral, variational or
patch-based approaches...), motion estimation and registration, drawing of graphic primitives (up to 3d vector objects),
edge detection, object segmentation, artistic rendering, etc.
This is a _versatile_ tool, useful to visualize and explore complex image data,
as well as elaborate custom image processing pipelines (see these
[slides](http://issuu.com/dtschump/docs/gmic_slides) to get more information about
the motivations and goals of the _G'MIC_ project).

# 2. A selection of some new filters and effects

Here we propose a description of some of the most significant filters recently added. We illustrate their usage
from the _G'MIC_ plug-in for _GIMP_. All these filters are of course available from other interfaces as well
(in particularly within the _CLI_ tool [`gmic`](http://gmic.eu/reference.shtml)).

## 2.1. Painterly rendering of photographs

Filter __Artistic / Brushify__ tries to transform an image into a _painting_.
Here, the idea is to simulate the process of painting with brushes on a white canvas. One provides a template image
and the algorithm first analyzes the image geometry (local contrasts and orientations of the contours), then
attempt to reproduce the image with a single _brush_ that will be locally rotated and scaled accordingly to the
contour geometry.
By simulating enough of brushstrokes, one gets a «painted» version of the template image, which is more or less close to the original one,
depending on the brush shape, its size, the number of allowed orientations, etc.
All these settings being customizable by the user as parameters of the algorithm:
This filter allows thus to render a wide variety of painting effects.

![img](https://tschumperle.users.greyc.fr/lfr3/gmic_brushify.jpg)
_Fig.2.1.1. Overview of the filter « Brushify » in the G'MIC plug-in GIMP. The brush that will be used by the algorithm
is visible on the top left._

The animation below illustrates the diversity of results one can get with this filter, applied on the same
input picture of a lion. Various brush shapes and geometries have been supplied to the algorithm.
_Brushify_ is computationally expensive so its implementation is parallelized (each core gives several brushtrockes simultaneously).

![img](https://tschumperle.users.greyc.fr/lfr3/brushify2.gif)
_Fig.2.1.2. A few examples of renderings obtained with « Brushify » from the same template image, but with different brushes and parameters._

Note that this is particularly funny to invoke this filter from the command line interface (using the option `-brushify`
available in `gmic`) to process a sequence of video frames
([see this example of « brushified » video](https://www.youtube.com/watch?v=tf_fMzS3UyQ&feature=youtu.be)).

## 2.2. Reconstructing missing data from sparse samples

_G'MIC_ gets a new algorithm to reconstruct missing data in images. This is a classical problem in image processing,
often named «[Image Inpainting](https://en.wikipedia.org/wiki/Inpainting)», and _G'MIC_ already had a lot of
useful filters to solve this problem.
Here, the newly added interpolation method assumes only a sparse set of image data is known, for instance a few scattered pixels
over the image (instead of continuous chuncks of image data). The analysis and the reconstruction of the global
image geometry is then particularly tough.

The new option `-solidify` in _G'MIC_ allows the reconstruction of dense image data from such a sparse sampling,
based on a multi-scale [diffusion PDE's](https://en.wikipedia.org/wiki/Diffusion_equation)-based technique.
The figure below illustrates the ability of the algorithm with an example of image reconstruction. We start from
an input [image of a waterdrop](https://www.flickr.com/photos/jfrogg/5810936597/in/photolist-9Ruz12-oHDr6x-8VW83C-iM2cR1-oXCyji-nTGYXY-oavqFt-5emqwQ-8Qx6Nx-pkREpT-nYhS8D-najxb9-a3XHVZ-jUq3Aw-qGTeCo-r2yj33-pvci15-p7WnqP-ajPFM1-7SquY5-6busU-7B5iLy-9Av8Kr-4jZ6zq-b2anbD-c2LF73-aiQ5Ta-cdTWpb-ob7FJx-aohzY1-razwT3-p5rXdc-fCvsV3-4N8vKM-4Nhy4z-4HVUCr-eMUCnQ-bqJnaX-6CuzQd-qCYpsk-NzLkj-hYUtqE-oVbqnh-4H1DkM-r4ArWu-drpZHp-pHbCDL-8Zr8K1-xxf3Q9-e8dK5N),
and we keep only 2.7% of the image data (a really little amount of data!). The algorithm is able to reconstruct
a whole image that looks like the input, even if all the small details have not been
fully reconstructed (of course!). The more samples we have, the finer details we can recover.

![img](https://tschumperle.users.greyc.fr/lfr3/waterdrop2.gif)
_Fig.2.2.1. Reconstruction of an image from a sparse sampling._

As this reconstruction technique is quite generic, several new _G'MIC_ filters takes advantage of it:

- Filter __Repair / Solidify__ applies the algorithm in a direct manner, by reconstructing transparent areas
from the interpolation of opaque regions.
The animation below shows how this filter can be used to create an artistic blur on the image borders.

![img](https://tschumperle.users.greyc.fr/lfr3/gmic_sol.gif)
_Fig.2.2.2. Overview of the « Solidify » filter, in the G'MIC plug-in for GIMP._

From an artistic point of view, there are many possibilities offered by this filters.
For instance, it becomes really easy to generate color gradients with complex shapes, as shown with the two examples below
(also in [this video](https://www.youtube.com/watch?v=rgLQayllv-g) that details the whole process).

![img](https://tschumperle.users.greyc.fr/lfr3/gmic_solidify2.jpg)
_Fig.2.2.3. Using the « Solidify » filter of G'MIC to easily create color gradients with complex shapes (input images on the left, filter results on the right)._

- Filter __Artistic / Smooth abstract__ uses same idea as the one with the waterdrop image:
it purposely sub-samples the image in a sparse way, by choosing keypoints mainly on the image edges, then use the reconstruction
algorithm to get the image back. With a low number of samples, the filter can only render a piecewise smooth image,
i.e. a smooth abstraction of the input image.

![img](https://tschumperle.users.greyc.fr/lfr3/smooth_abstract.jpg)
_Fig.2.2.4. Overview of the « Smooth abstract » filter in the G'MIC plug-in for GIMP._

- Filter __Rendering / Gradient [random]__ is able to synthetize random colored backgrounds. Here again, the filter initializes
  a set of colors keypoints randomly chosen over the image, then interpolate them with the new reconstruction algorithm.
We end up with a psychedelic background composed of randomly oriented color gradients.

![img](https://tschumperle.users.greyc.fr/lfr3/gradient_random.jpg)
_Fig.2.2.5. Overview of the « Gradient [random] » filter in the G'MIC plug-in for GIMP._

- __Simulation of analog films__ : the new reconstruction algorithm also allowed a major improvement
for all the analog film emulation filters that have been present in _G'MIC_ for years.
The section __Film emulation/__ proposes a wide variety of filters for this purpose. Their goal is to apply color transformations
to simulate the look of a picture shot by an analogue camera with a certain kind of film.
Below, you can see for instance a few of the _300_ colorimetric transformations that are available in _G'MIC_.

![img](https://tschumperle.users.greyc.fr/lfr3/gmic_clut1.jpg)
_Fig.2.2.6. A few of the 300+ color transformations available in G'MIC._

From an algorithmic point of view, such a color mapping is extremely simple to implement :
for each of the _300+_ presets, _G'MIC_ actually has an [_HaldCLUT_](http://www.quelsolaar.com/technology/clut.html), that is
a fonction defining for each possible color _(R,G,B)_ (of the original image), a new color _(R',G',B')_ color to set
instead. As this function is not necessarily analytic, an _HaldCLUT_ is stored in a discrete manner as a lookup table that gives
the result of the mapping _for all_ possible colors of the _RGB_ cube (that is _2^24 = 16777216_ values
if we work with a _8bits_ precision per color component). This _HaldCLUT_-based color mapping is illustrated below for all values of the _RGB_ color cube.

![img](https://tschumperle.users.greyc.fr/lfr3/gmic_clut0.jpg)
_Fig.2.2.7. Principle of an HaldCLUT-based colorimetric transformation._

This is a large amount of data: even by subsampling the _RGB_ space (e.g. with _6 bits_ per component) and compressing the corresponding _HaldCLUT_ file,
you ends up with approximately _200_ and _300_ Kio for each mapping file.
Multiply this number by _300+_ (the number of available mappings in _G'MIC_), and you get a total of _85 Mio_ of data, to store all these color transformations.
Definitely not convenient to spread and package!

The idea was then to develop a new lossy compression technique focused on _HaldCLUT_ files, that is volumetric discretised vector-valued functions which are piecewise smooth by nature.
And that what has been done in _G'MIC_, thanks to the new sparse reconstruction algorithm. Indeed, the reconstruction technique also works with _3D_ image data (such as an _HaldCLUT_!), so
one simply has to extract a sufficient number of significant keypoints in the _RGB_ cube and interpolate them afterwards to allow the reconstruction of a whole _HaldCLUT_
(taking care to have a reconstruction error small enough to be sure that
the color mapping we get with the compressed _HaldCLUT_ is indistinguishable from the non-compressed one).

![img](https://tschumperle.users.greyc.fr/lfr3/gmic_clut2.jpg)
_Fig.2.2.8. How the decompression of an HaldCLUT now works in G'MIC, from a set of colored keypoints located in the RGB cube._

Thus, _G'MIC_ doesn't need to store all the color data from an _HaldCLUT_, but only a sparse sampling of it (i.e. a sequence of `{ rgb_keypoint, new_rgb_color }`).
Depending on the geometric complexity of the _HaldCLUTs_ to encode, more or less keypoints are necessary (roughly from _30_ to _2000_).
As a result, the storage of the _300+_ _HaldCLUTs_ in _G'MIC_ requires now only _850 Kio_ of data (instead of _85 Mio_), that is a compression gain of _99%_ !
That makes the whole _HaldCLUT_ data storable in a single file that is easy to ship with the _G'MIC_ package. Now, a user can then apply all the _G'MIC_ color transformations
while being offline (before that, each _HaldCLUT_ had to be downloaded separatly from the _G'MIC_ server when requested).

It looks like this new reconstruction algorithm from sparse samples is really great, and no doubts it will be used in other filters in the future.

## 2.3. Make textures tileable

Filter __Arrays & tiles / Make seamless [patch-based]__ tries to transform an input texture to make it _tileable_, so that it can be duplicated as _tiles_ along the horizontal and vertical axes
without visible seams on the borders of adjacent tiles.
Note that this is something that can be extremely hard to achieve, if the input texture has few auto-similarity or with glaring luminosity changes spatially.
That is the case for instance with the «Salmon» texture shown below as four adjacent tiles (configuration _2x2_) with a lighting that goes from dark (on the left) to bright (on the right).
Here, the algorithm modifies the texture so that the tiling shows no seams, but where the aspect of the original texture is preserved as much as possible
(only the texture borders are modified).

![img](https://tschumperle.users.greyc.fr/lfr3/seamless1.gif)
_Fig.2.3.1. Overview of the « Make Seamless » filter in the G'MIC plug-in for GIMP._

We can imagine some great uses of this filter, for instance in video games, where texture tiling is common to render large virtual worlds.

![img](https://tschumperle.users.greyc.fr/lfr3/seamless2.gif)
_Fig.2.3.2. Result of the « Make seamless » filter of G'MIC to make a texture tileable._

## 2.4. Image decomposition into several levels of details

A «new» filter __Details / Split details [wavelets]__ has been added to decompose an image into several levels of details.
It is based on the so-called [«à trous» wavelet decomposition](https://en.wikipedia.org/wiki/Stationary_wavelet_transform).
For those who already know the popular [_Wavelet Decompose_](http://registry.gimp.org/node/11742) plug-in for _GIMP_, there won't be so much novelty here, as it is mainly the same kind of
decomposition technique that has been implemented.
Having it directly in _G'MIC_ is still a great news: it offers now a preview of the different scales that will be computed, and the implementation is parallelized to take advantage of multiple cores.

![img](https://tschumperle.users.greyc.fr/lfr3/gmic_wavelets.jpg)
_Fig.2.4.1. Overview of the wavelet-based image decomposition filter, in the G'MIC plug-in for GIMP._

The filter outputs several layers, so that each layer contains the details of the image at a given scale. All those layers blended together gives the original image back.

Thus, one can work on those output layers separately and modify the image details only for a given scale. There are a lot of applications for this kind of image decomposition,
one of the most spectacular being the ability to retouch the skin in portraits : the flaws of the skin are indeed often present in layers with middle-sized scales, while
the natural skin texture (the pores) are present in the fine details. By selectively removing the flaws while keeping the pores, the skip aspect stays natural after the retouch
(see [this wonderful link](http://blog.patdavid.net/2011/12/getting-around-in-gimp-skin-retouching.html) for a detailed tutorial about skin retouching techniques, with _GIMP_).

![img](https://tschumperle.users.greyc.fr/lfr3/skin.gif)
_Fig.2.4.2. Using the wavelet decomposition filter in G'MIC for removing visible skin flaws on a portrait._

## 2.5. Image denoising based on « Patch-PCA »

_G'MIC_ is also well known to offer a wide range of algorithms for image _denoising_ and _smoothing_ (currently more than a dozen). And he got one more !
Filter __Repair / Smooth [patch-pca]__ proposed a new image denoising algorithm that is both efficient and computationally intensive (despite its multi-threaded implementation, you
probably should avoid it on a machine with less than 8 cores...).
In return, it sometimes does magic to suppress noise while preserving small details.

![img](https://tschumperle.users.greyc.fr/lfr3/patchpca.jpg)
_Fig.2.5.1. Result of the new patch-based denoising algorithm added to G'MIC._

## 2.6. The « Droste » effect

[The Droste effect](https://en.wikipedia.org/wiki/Droste_effect) (also known as « _mise en abyme_ » in art) is the effect of a picture appearing within itself recursively.
To achieve this, a new filter __Deformations / Continuous droste__ has been added into _G'MIC_. It's actually a complete rewrite of the popular Mathmap's
[Droste filter](https://www.flickr.com/groups/88221799@N00/discuss/72157601071820707/) that has existed for years.
_Mathmap_ was a very popular plug-in for _GIMP_, but it seems to be not maintained anymore. The Droste effect was one of its most iconic and complex filter.
_Martin « Souphead »_, one former user of _Mathmap_ then took the bull by the horns and converted the complex code of this filter specifically into a _G'MIC_ script,
resulting in a parallelized implementation of the filter.

![img](https://tschumperle.users.greyc.fr/lfr3/droste0.jpg)
_Fig.2.6.1. Overview of the converted « Droste » filter, in the G'MIC plug-in for GIMP._

This filter allows all artistic delusions. For instance, it becomes trivial to create the result below in a few steps: create a selection around the clock, move it on a transparent background, run the _Droste_ filter,
_et voilà!_.

![img](https://tschumperle.users.greyc.fr/lfr3/droste2.jpg)
_Fig.2.6.2. A simple example of what the G'MIC « Droste » filter can do._

## 2.7. Equirectangular to nadir-zenith transformation

The filter __Deformations / Equirectangular to nadir-zenith__ is another filter converted from _Mathmap_ to _G'MIC_.
It is specifically used for the processing of panoramas: it reconstructs both the
[_Zenith_](https://en.wikipedia.org/wiki/Zenith) and the
[_Nadir_](https://en.wikipedia.org/wiki/Nadir) regions of a panorama so that they can be easily modified
(for instance to reconstruct missing parts), before being reprojected back into the input panorama.

![img](https://tschumperle.users.greyc.fr/lfr3/zenith1.jpg)
_Fig.2.7.1. Overview of the «Deformations / Equirectangular to nadir-zenith» filter in the G'MIC plug-in for GIMP._

[_Morgan Hardwood_](https://plus.google.com/u/0/b/117441237982283011318/115320419935722486008/posts) has wrote a quite detailled tutorial,
[here on pixls.us](https://discuss.pixls.us/t/panography-patching-the-zenith-and-nadir/585),
about the reconstruction of missing parts in the Zenith/Nadir of an equirectangular panorama. Check it out!

# 3. Other various improvements

Finally, here are other highlights about the _G'MIC_ project:

- Filter __Rendering / Kitaoka Spin Illusion__ is another _Mathmap_ filter converted to _G'MIC_ by _Martin « Souphead »_. It generates a certain kind of
[optical illusions](http://www.ritsumei.ac.jp/~akitaoka/index-e.html) as shown below (close your eyes if you are epileptic!)

![img](https://tschumperle.users.greyc.fr/lfr3/spin2.jpg)
_Fig.3.1. Result of the « Kitaoka Spin Illusion » filter._

- Filter __Colors / Color blindness__ transforms the colors of an image to simulate different types of [color blindness](https://en.wikipedia.org/wiki/Color_blindness).
  This can be very helpful to check the accessibility of a web site or a graphical document for colorblind people.
  The color transformations used here are the same as defined on [_Coblis_](http://www.color-blindness.com/coblis-color-blindness-simulator/),
  a website that proposes to apply this kind of simulation online. The _G'MIC_ filter gives strictly identical results, but it ease
  the batch processing of several images at once.

![img](https://tschumperle.users.greyc.fr/lfr3/gmic_cb.jpg)
_Fig.3.2. Overview of the colorblindness simulation filter, in the G'MIC plug-in for GIMP._

- Since a few years now, _G'MIC_ has its own parser of mathematical expression, a really convenient module to perform complex calculations when applying image filters
This core feature gets new functionalities: the ability to manage variables that can be complex, vector or matrix-valued, but also the creation of
user-defined mathematical functions. For instance, the classical rendering of the [_Mandelbrot_ fractal set](https://en.wikipedia.org/wiki/Mandelbrot_set)
(done by estimating the divergence of a sequence of complex numbers) can be implemented like this, directly on the command line:
``````````sh
$ gmic 512,512,1,1,"c = 2.4*[x/w,y/h] - [1.8,1.2]; z = [0,0]; for (iter = 0, cabs(z)<=2 && ++iter<256, z = z**z + c); 6*iter" -map 7,2
``````````

![img](https://tschumperle.users.greyc.fr/lfr3/gmic_mand.jpg)
_Fig.3.3. Using the G'MIC math evaluator to implement the rendering of the Mandelbrot set, directly from the command line!_

This clearly enlarge the math evaluator ability, as you are not limited to scalar variables anymore. You can now create complex filters which are able to
solve linear systems or compute eigenvalues/eigenvectors, and this, for each pixel of an input image.
It's a bit like having a micro-(micro!)-[_Octave_](https://www.gnu.org/software/octave/) inside _G'MIC_.
Note that the _Brushify_ filter described earlier uses these new features extensively.
It's also interesting to know that the _G'MIC_ math expression evaluator has its own [_JIT_ compiler](https://en.wikipedia.org/wiki/Just-in-time_compilation)
to achieve a fast evaluation of expressions when applied on thousands of image values simultaneously.

- Another great contribution has been proposed by [_Tobias Fleischer_](https://plus.google.com/+TobiasFleischer/posts), with the creation of a new _C_
[_API_](https://en.wikipedia.org/wiki/Application_programming_interface) to invoke the functions of the [_libgmic_](http://gmic.eu/libgmic.shtml) library
(which is the library containing all the _G'MIC_ features, initially available through a _C++_ _API_ only).
As the _C_ [_ABI_](https://fr.wikipedia.org/wiki/Application_binary_interface) is standardized (unlike _C++_),
this basically means _G'MIC_ can be interfaced more easily with languages other than _C++_.
In the future, we can imagine the development of _G'MIC_ _APIs_ for languages such as _Python_ for instance.
_Tobias_ is currently using this new _C_ _API_ to develop _G'MIC_-based plug-ins compatible with the [_OpenFX_](https://en.wikipedia.org/wiki/OpenFX_%28API%29) standard.
Those plug-ins should be usable indifferently in video editing software such as [After effects](https://fr.wikipedia.org/wiki/Adobe_After_Effects), [Sony Vegas Pro](https://fr.wikipedia.org/wiki/Sony_Vegas_Pro)
or [Natron](http://www.natron.fr/). This is still an on-going work though.

![img](https://tschumperle.users.greyc.fr/lfr3/gmic_natron.jpg)
_Fig.3.3. Overview of some G'MIC-based OpenFX plug-ins, running under Natron._

- Another contributor [_Robin « Starfall Robles »_](https://github.com/Starfall-Robles) started to develop a [Python script](https://github.com/Starfall-Robles/Blender-2-G-MIC)
to provide some of the _G'MIC_ filters directly in the [_Blender_ video sequence editor](http://www.blendernation.com/2016/04/27/creative-imagery-blender-2-gmic/).
This work is still in a early stage, but you can already apply different _G'MIC_ effects on image sequences (see [this video](https://www.youtube.com/watch?v=TSzoEXAV1zs) for a demonstration).

![img](https://tschumperle.users.greyc.fr/lfr3/gmic_blender2.jpg)
_Fig.3.4. Overview of a dedicated G'MIC script running within the Blender VSE._

- You can find out _G'MIC_ filters also in the opensource nonlinear video editor [_Flowblade_](https://github.com/jliljebl/flowblade), thanks to the hard work of
[_Janne Liljeblad_](https://plus.google.com/u/0/b/117441237982283011318/102624418925189345577/posts) (_Flowblade_ project leader).
Here again, the goal is to allow the application of _G'MIC_ effects and filters directly on image sequences, mainly for artistic purposes
(as shown in [this video](https://vimeo.com/157364651) or [this one](https://vimeo.com/164331676)).

![img](https://tschumperle.users.greyc.fr/lfr3/gmic_flowblade.jpg)
_Fig.3.5. Overview of a G'MIC filter applied under Flowblade, a nonlinear video editor._

# 4. What's next ?

As you see, the _G'MIC_ project is doing well, with an active development and cool new features added months after months.
You can find and use interfaces to _G'MIC_ in more and more opensource software, as
[_GIMP_](http://www.gimp.org),
[_Krita_](https://krita.org/),
[_Blender_](https://www.blender.org/),
[_Photoflow_](https://aferrero2707.github.io/PhotoFlow/),
[_Flowblade_](https://github.com/jliljebl/flowblade),
[Veejay](http://veejayhq.net/),
[_EKD_](http://ekd.tuxfamily.org/) and
[_Natron_](http://natron.fr/) in a near future (at least we hope so!).

At the same time, we can see more and more external resources available for _G'MIC_ : tutorials, blog articles
([here](https://discuss.pixls.us/t/fourier-transform-for-fixing-regular-pattern-noise/586),
[here](https://paulsphotopalace.wordpress.com/the-color-mixers-3/),
[here](http://lapizybits.blogspot.com/2015/12/efecto-esbozo.html),...),
or demonstration videos
([here](https://www.youtube.com/watch?v=YjqMT7Mn2ac),
[here](https://www.youtube.com/watch?v=VPG1dkPlyvo),
[here](https://www.youtube.com/watch?v=N3KqWTmkgB8),
[here](https://www.youtube.com/watch?v=w6Sr1nO5gFo),...).
This shows the project raises among users of opensource software for graphics and photography.

The development of version *1.7.2* already hit the ground running, so stay tuned and visit the official _G'MIC_ [forum on pixls.us](https://discuss.pixls.us/c/software/gmic)
to get more info about the project developement and get answers to your questions.
Meanwhile, feel the power of _free software_ for image processing!

### Links:
* [G'MIC home page](http://gmic.eu)
* [G'MIC plug-in for GIMP](http://gmic.eu/gimp.shtml)
* [Introduction to the CLI interface of G'MIC](http://gmic.eu/tutorial/basics.shtml)
* [Technical reference documentation](http://gmic.eu/reference.shtml)
