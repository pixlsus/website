---
date: 2019-09-06
title: "G'MIC 2.7 - Process Your Images with Style!"

lede-img: "kanagawa.jpg"
lede-img-thumb: "th_kanagawa.jpg"
lede-attribution: "<a href='https://en.wikipedia.org/wiki/The_Great_Wave_off_Kanagawa'>Katsushika Hokusai</a>"

author: David Tschumperlé
author-img: /images/authors/david-tschumperle.png
author-bio: "I am <a title='David Tschumperlé' href='https://tschumperle.users.greyc.fr/' >David Tschumperlé</a>, a permanent researcher working in the field of image processing in a daily basis, since 1999. I work for the <a title='CNRS' href='http://www.cnrs.fr/' >CNRS</a> institute, more particularly in the <a title='Equipe Image du GREYC' href='https://www.greyc.fr/image' >Image Group </a>at the <a title='Laboratoire GREYC' href='http://www.greyc.fr' >GREYC</a> laboratory in Caen/France."

collection: blogposts
layout: blog-posts.hbt
---



The [IMAGE](https://www.greyc.fr/?page_id=443&lang=en) team at the [GREYC](https://www.greyc.fr/?page_id=1342&lang=en) research laboratory is pleased to announce the release of version **2.7** of **[_G'MIC_](https://gmic.eu)** (_GREYC's Magic for Image Computing_), its  free, generic, extensible, and probably a little magical, [framework](https://en.wikipedia.org/wiki/Software_framework) for [digital image processing](https://en.wikipedia.org/wiki/Digital_image_processing).

![teaser](https://gmic.eu/gmic270/original/teaser.gif)

[The previous PIXLS.US article](https://pixls.us/blog/2018/08/g-mic-2-3-6/) on this open-source framework was published a year ago, in August 2018. This new release is therefore a good opportunity to summarize the main features and milestones of the project's life over the past twelve months.
Fasten your seat belts, the road is long and full of surprises!

----

Useful links:
-------------
- [The G'MIC Project](https://gmic.eu)
- [G'MIC Twitter Feed](https://twitter.com/gmic_ip)
- [G'MIC Forum on PIXLS.US](https://discuss.pixls.us/c/software/gmic)

----



# 1. _G'MIC_ in 300 words

[_G'MIC_](https://gmic.eu) is a piece of software that has been developed for more than [10 years](https://pixls.us/blog/2018/08/g-mic-2-3-6/) now, mainly in [_C++_](https://en.wikipedia.org/wiki/C%2B%2B), by two members of the [IMAGE](https://www.greyc.fr/?page_id=443&lang=en) team of the [GREYC](https://www.greyc.fr/?page_id=1342&lang=en) lab: [Sébastien Fourey](https://foureys.users.greyc.fr/index.php) and [David Tschumperlé](https://tschumperle.users.greyc.fr/). It is distributed under the terms of the [CeCILL](http://www.cecill.info/index.en.html) free-software license. GREYC is a French public research laboratory located in Caen, specialized in digital sciences, under the head of three academic institutions: [CNRS](https://www.cnrs.fr/en), [University of Caen](http://welcome.unicaen.fr/), and [ENSICAEN](https://www.ensicaen.fr/en/).

The IMAGE team, one of the seven teams in the laboratory, is composed of researchers, professors, Ph.D. students and engineers, all specialized in the fields of algorithmics and mathematics of [image processing](https://en.wikipedia.org/wiki/Digital_image_processing).

<figure>
<a href="https://gmic.eu/gmic270/fullsize/logo_gmic.png">
<img src="https://gmic.eu/gmic270/thumb/logo_gmic.png" alt="G'MIC logo">
</a>
<figcaption><em>Fig.1.1: G'MIC project logo, and its mascot "Gmicky" (designed by [David Revoy](https://www.davidrevoy.com/)).</em></figcaption>
</figure>

_G'MIC_ is cross-platform (_GNU/Linux_, _MacOS_, _Windows_, …). It provides various user interfaces for manipulating _generic_ image data, i.e. 2D or 3D hyperspectral images or sequences of images with floating-point values (which indeed includes "usual" color images). Around [a thousand different processing functions](https://gmic.eu/reference.shtml) are already available. However, arbitrarily many features can be added thanks to an integrated scripting language.

The most commonly used _G'MIC_ interfaces are: the [`gmic`](https://gmic.eu/reference.shtml) command, that can be accessed from the command line (which is an essential complement to [ImageMagick](https://www.imagemagick.org/) or [GraphicsMagick](https://www.graphicsmagick.org)), the [_G'MIC Online_](https://gmicol.greyc.fr/) Web service, but above all, the plug-in [_G'MIC-Qt_](https://github.com/c-koi/gmic-qt), available for the well-known image editing software [GIMP](https://www.gimp.org), [Krita](https://www.krita.org), and [Paint.net](https://www.getpaint.net). It provides more than 500 different filters to apply on images.

<figure>
<a href="https://gmic.eu/gmic270/fullsize/gmic_270.png">
<img src="https://gmic.eu/gmic270/thumb/gmic_270.png" alt="G'MIC-Qt plug-in">
</a>
<figcaption><em>Fig.1.2: The G'MIC-Qt plug-in, here in version **2.7**, is at the moment the most downloaded user interface of the G'MIC project.</em></figcaption>
</figure>

Thanks to its extensible architecture, _G'MIC_ is regularly enhanced with new image processing algorithms, and it is these latest additions that will be discussed in the following sections.


# 2. Add style to your images!

_G'MIC_ has recently implemented a neat filter for **style transfer** between two images, available from the _G'MIC-Qt_ plug-in under the "**Artistic / Stylize**" entry.
The concept of style transfer is quite simple: we try to transform an image (typically a _photograph_) by transferring the style of another image to it (for example a _painting_).

<figure>
<a href="https://gmic.eu/gmic270/fullsize/en_style_transfer.png">
<img src="https://gmic.eu/gmic270/thumb/en_style_transfer.png" alt="Principle of style transfer">
</a>
<figcaption><em>Fig.2.1: Principle of style transfer between two images.</em></figcaption>
</figure>

The implementation of such a style transfer method is relatively complex: The algorithm must be able to recompose the original photograph by "borrowing" pixels from the style image and intelligently combining them, like a puzzle to be reconstructed, to best match the content of the data to be reproduced, in terms of contours, colors and textures. How easily this is done depends of course on the compatibility between the input image and the chosen style. In computer graphics, most existing implementations of style transfer methods are based on [convolutional neural networks](https://en.wikipedia.org/wiki/Convolutional_neural_network), more particularly [generative adversarial networks (_GANs_)](https://en.wikipedia.org/wiki/Generative_adversarial_network).

_G'MIC_ implements style transfer in a different way (without relying on neural networks, the scientific article detailing the algorithm is currently being written!). This method is parallelizable and can therefore benefit from all the processing units (cores) available on the user's computer. The computation time naturally depends on the input image resolution, and the accuracy of the desired reconstruction. On a standard 4-cores PC, it could take tens of seconds for low resolution images (e. g. _800x800_), up to several minutes for larger pictures.

As one can imagine, it is a **very versatile** filter, since we can apply any style to any input image without hard constraints. Some famous paintings are available by default in the filter, in order to propose predefined styles to the user.

<figure>
<a href="https://gmic.eu/gmic270/fullsize/gmic_stylize.png">
<img src="https://gmic.eu/gmic270/thumb/gmic_stylize.png" alt="Filter'Artistic / Stylize'">
</a>
<figcaption><em>Fig.2.2: "**Artistic / Stylize**" filter, as it appears in the G'MIC-Qt plug-in, with its many parameters that can be tuned !</em></figcaption>
</figure>

Let us be honest, it is not always easy to obtain satisfactory results from the first draft. It is generally necessary to choose your starting images carefully, and to play with the many parameters available to refine the type of rendering generated by the algorithm. Nevertheless, the filter is sometimes able to generate quite interesting outcomes, such as those shown below (the original photo is visible at the top left, the style chosen at the top right, and the result of the style transfer at the bottom). Imagine how long it would take for a graphic designer to make these transformations "by hand"!

<figure>
<a href="https://gmic.eu/gmic270/fullsize/en_stylization_car_full_1.png">
<img src="https://gmic.eu/gmic270/thumb/en_stylization_car_full_1.png" alt="Mondrian Stylization">
</a>
<figcaption><em>Fig.2.3: Stylization of a car from the painting "[Gray Tree](https://en.wikipedia.org/wiki/Gray_Tree)" by [Piet Mondrian](https://en.wikipedia.org/wiki/Piet_Mondrian).</em></figcaption>
</figure>

<figure>
<a href="https://gmic.eu/gmic270/fullsize/en_stylization_car_full_2.png">
<img src="https://gmic.eu/gmic270/thumb/en_stylization_car_full_2.png" alt="Kandinsky Stylization">
</a>
<figcaption><em>Fig.2.4: Stylization of the same car from the painting "[Gelb-Rot-Blau](https://fr.wikipedia.org/wiki/Gelb-Rot-Blau)" by [Vassily Kandinsky](https://en.wikipedia.org/wiki/Wassily_Kandinsky).</em></figcaption>
</figure>

<figure>
<a href="https://gmic.eu/gmic270/fullsize/en_stylization_car_full_5.png">
<img src="https://gmic.eu/gmic270/thumb/en_stylization_car_full_5.png" alt="Hokusai Stylization">
</a>
<figcaption><em>Fig.2.5: Stylization of the same car from the painting "[The Great Wave off Kanagawa](https://en.wikipedia.org/wiki/The_Great_Wave_off_Kanagawa)" of [Hokusai](https://en.wikipedia.org/wiki/Hokusai).</em></figcaption>
</figure>

<figure>
<a href="https://gmic.eu/gmic270/fullsize/en_stylization_cat_full_7.png">
<img src="https://gmic.eu/gmic270/thumb/en_stylization_cat_full_7.png" alt="Hatch Stylization">
</a>
<figcaption><em>Fig.2.6: Stylization of a cat from a hatched drawing.</em></figcaption>
</figure>

<figure>
<a href="https://gmic.eu/gmic270/fullsize/en_stylization_bottles_full_21.png">
<img src="https://gmic.eu/gmic270/thumb/en_stylization_bottles_full_21.png" alt="Mondrian-2">
</a>
<figcaption><em>Fig.2.7: Stylization of bottles from the painting "[Evening: Red Tree](https://en.wikipedia.org/wiki/Evening;_Red_Tree)" by [Piet Mondrian](https://en.wikipedia.org/wiki/Piet_Mondrian).</em></figcaption>
</figure>

<figure>
<a href="https://gmic.eu/gmic270/fullsize/en_stylization_bottles_full_23.png">
<img src="https://gmic.eu/gmic270/thumb/en_stylization_bottles_full_23.png" alt="Picasso Stylization">
</a>
<figcaption><em>Fig.2.8: Stylization of bottles from the painting "[Le réservoir - Horta de Ebro](https://lewebpedagogique.com/bourguignon/2011/02/10/le-reservoir-picasso/)" by [Pablo Picasso](https://en.wikipedia.org/wiki/Pablo_Picasso).</em></figcaption>
</figure>

Other examples of image stylization can be found on [the image gallery, dedicated to this filter](https://gmic.eu/gallery/stylization.shtml). To our knowledge, _G'MIC_ is the only "mainstream" image processing software currently offering a **generic** style transfer filter, where **any** style image can be chosen.

A last funny experiment: get a [picture of an Alien's head](https://www.google.com/search?hl=en&tbm=isch&source=hp&biw=1920&bih=1072&ei=WpNWXcWzOITQaJDghfAN&q=alien+roswell&oq=alien+roswell&gs_l=img.3..0l7j0i5i30j0i8i8i30l2.1371.3446...3664...1.0...0.51.587.14...0...0...1...gws-wiz-img.KpJUtbI9LbU&ved=0ahUKEwjFyNjFyNjPpIfkAhUEKBoKHRBwAd4Q4d4dUDCAU&uact=5), like _Roswell_, and then select a crop of the [Mandelbrot fractal set](https://en.wikipedia.org/wiki/Mandelbrot_set) as your style image. Use the transfer filter to generate a "fractal" rendering of your alien head. Then, make the whole world believe that the Mandelbrot set contains the mathematical proof of the existence of aliens... ☺

<figure>
<a href="https://gmic.eu/gmic270/fullsize/alien_mandelbrot.png">
<img src="https://gmic.eu/gmic270/thumb/alien_mandelbrot.png" alt="Mandelbrot Stylization">
</a>
<figcaption><em>Fig.2.9: **Breaking News!** An Alien head was found in the Mandelbrot fractal set ! (if you don't see it at first sight, tilt your head to the left...)</em></figcaption>
</figure>

In short, this filter has a clear creative potential for all kind of artists!

# 3. Interactive deformation and morphing

This year, _G'MIC_ got an implementation of [the _RBFs_ interpolation method](https://en.wikipedia.org/wiki/Radial_basis_function_interpolation) (_Radial Basis Functions_), which is able to estimate a dense interpolated function in any dimension, from a known set of scattered samples (not necessarily located on a regular grid). Thus, it gave us the idea to add distortion filters where the user interaction is focused in adding and moving keypoints over the image. In a second stage, _G'MIC_ interpolates the data represented by these keypoints in order to perform the distortion on the entire image.

Let us start with the **"Deformations / Warp [interactive]"** filter which, as its name suggests, allows the user to distort an image locally by creating/moving keypoints.

<figure>
<a href="https://gmic.eu/gmic270/fullsize/en_warp_girl.png">
<img src="https://gmic.eu/gmic270/thumb/en_warp_girl.png" alt="Keypoint-based Distortion'">
</a>
<figcaption><em>Fig.3.1: The new **"Deformations / Warp [interactive]"** filter allows images to be distorted interactively, for example to quickly create caricatures from portrait photographs.</em></figcaption>
</figure>

The animation below shows this interactive filter in use, and illustrates the fact that these keypoints can be considered as anchors to the image, when they are moved.

<figure>
<a href="https://gmic.eu/gmic270/original/gmic_deform.gif">
<img src="https://gmic.eu/gmic270/original/gmic_deform.gif" alt="Key-point deformation - animation">
</a>
<figcaption><em>Fig.3.2: Illustration of the user interaction in the G'MIC deformation filter, based on the creation and motion of keypoints.</em></figcaption>
</figure>

<em>(For those who might be concerned about the portraits photos used in the figures above and below: all these portraits are totally artificial, randomly generated by GANs via the website [_This Person Does Not Not Exist_](https://thispersondoesnotexist.com/). No moral prejudices to dread!)</em>.

The great advantage of using _RBFs_-based interpolation is that we do not have to explicitly manage a _spatial structure_ between the keypoints, for instance by defining a [mesh](https://en.wikipedia.org/wiki/Unstructured_grid) (i.e. a "deformation grid"). This gives a greater degree of freedom in the obtained distortion (see _Fig.3.3._ below). And at the same time, we keep a rather fine control on the local amplitude of the applied distortion, since adding more "identity" keypoints around a region naturally limits the distortion amplitude inside this region.

<figure>
<a href="https://gmic.eu/gmic270/fullsize/en_warp_man.png">
<img src="https://gmic.eu/gmic270/thumb/en_warp_man.png" alt="Key-point deformation - other example">
</a>
<figcaption><em>Fig.3.3: RBFs interpolation is able to create complex continuous distortions, with very few keypoints (here, by inverting the positions of the right/left eyes, and only 4 keypoints used).</em></figcaption>
</figure>

A short demonstration of this distortion filter is also visible in [this Youtube video](https://youtu.be/eWoRDzhAEtw).

And why not extending this kind of distortion for two images, instead of a single one? This is precisely what the new filter **"Deformations / Morph [interactive]"** does. It is able to render a [morphing](https://en.wikipedia.org/wiki/Morphing) sequence between two images (put on two separate layers), using the same interpolation technique that only asks for the user to set colored keypoints which match on both images.

<figure>
<a href="https://gmic.eu/gmic270/fullsize/en_morph_st.png">
<img src="https://gmic.eu/gmic270/thumb/en_morph_st.png" alt="Morphing filter - positioning of keypoints">
</a>
<figcaption><em>Fig.3.4: **"Deformations / Morph [interactive]"** filter asks the user to position keypoints indicating correspondences between two images.</em></figcaption>
</figure>

In the example above, keypoints are placed on characteristic areas of both faces (tip of nose, lips, eyebrows, etc.). In practice, this takes no more than 5 minutes. Thanks to these keypoints, the algorithm is able to estimate a global deformation map from one image to another, and can generate temporally "mixed" frames where the elements of the face remain relatively well aligned during the whole morphing sequence.

<figure>
<a href="https://gmic.eu/gmic270/fullsize/en_morph_ib.png">
<img src="https://gmic.eu/gmic270/thumb/en_morph_ib.png" alt="Morphing filter - intermediate image">
</a>
<figcaption><em>Fig.3.5: One of the intermediate images generated by the morphing filter, between the two input faces.</em></figcaption>
</figure>

By comparison, here is what we would obtain by simply averaging the two input images together, i.e. without correcting the displacement of the facial features between both images. Not a pretty sight indeed!

<figure>
<a href="https://gmic.eu/gmic270/fullsize/en_morph_avg.png">
<img src="https://gmic.eu/gmic270/thumb/en_morph_avg.png" alt="Morphing filter - simple averaging">
</a>
<figcaption><em>Fig.3.6: A simple averaging of the "Source" and "Target" images reveals the differences in the locations of the facial features.</em></figcaption>
</figure>

Thus, the morphing filter is able to quickly generate a set of intermediate frames, ranging from the "Source" to the "Target" faces, a sequence that can then be saved as an animation.

<figure>
<a href="https://gmic.eu/gmic270/original/morph.gif">
<img src="https://gmic.eu/gmic270/original/morph.gif" alt="Morphing filter - generated animation">
</a>
<figcaption><em>Fig.3.7: Animation resulting from the generation of all intermediate frames by the G'MIC morphing filter.</em></figcaption>
</figure>

Many other use cases of this morphing filter can be considered. The following example illustrates its application to render an animation from two photographs of the same object (a garden gnome), but shot with different [DOFs (Depth of Field)](https://en.wikipedia.org/wiki/Depth_of_field).

<figure>
<a href="https://gmic.eu/gmic270/fullsize/en_morph_dwarf_st.png">
<img src="https://gmic.eu/gmic270/thumb/en_morph_dwarf_st.png" alt="Morphing filter - example of the garden dwarf">
</a>
<figcaption><em>Fig.3.8: Two photographs with different depths of field, and the location of the correspondence keypoints put by the user.</em></figcaption>
</figure>

<figure>
<a href="https://gmic.eu/gmic270/original/morph_dwarf.gif">
<img src="https://gmic.eu/gmic270/original/morph_dwarf.gif" alt="Morphing filter - garden dwarf animation">
</a>
<figcaption><em>Fig.3.9: Animation resulting from the generation of all intermediate frames by the G'MIC morphing filter.</em></figcaption>
</figure>

Command line users will be pleased to know that these two filters can be tested very quickly from a _shell_, as follows:

~~~sh
$ gmic image.jpg x_warp
$ gmic source.jpg target.jpg x_morph
~~~~


# 4. Ever more colorimetric transformations

For several years, _G'MIC_ has contained colorimetric transformation filters able to simulate the film development process, or to give particular colorimetric moods to images (sunlight, rain, fog, morning, afternoon, evening, night, etc.). In [a previous report](https://pixls.us/blog/2017/06/g-mic-2-0/), we already mentioned these filters, which are essentially based on the use of [_3D CLUTs_](https://en.wikipedia.org/wiki/3D_lookup_table) (_Color Lookup Tables_) for modeling the color transformation.

A _3D CLUT_ is technically a three-dimensional array that provides for each possible _RGB_ color, a replacement color to apply to the image.

<figure>
<a href="https://gmic.eu/gmic270/fullsize/en_whatisaclut.png">
<img src="https://gmic.eu/gmic270/thumb/en_whatisaclut.png" alt="Illustration of a 3D Color LUT">
</a>
<figcaption><em>Fig.4.1: Modeling a colorimetric transformation by a "3D Color LUT".</em></figcaption>
</figure>

The main interest of these _3D CLUTs_ is the great variety of transformations they can represent: They can indeed define _RGB-to-RGB_ functions with almost any kind of variations. The only "constraint" of these methods is that all image pixels having the same color will be transformed into pixels that also have an identical color.

<figure>
<a href="https://gmic.eu/gmic270/fullsize/en_cluts_ex.png">
<img src="https://gmic.eu/gmic270/thumb/en_cluts_ex.png" alt="Examples of CLUT-based transformations">
</a>
<figcaption><em>Fig.4.2: Illustration of the variety of colorimetric transformations that can be modeled by 3D CLUTs.</em></figcaption>
</figure>

The disadvantage, however, is that these 3D _CLUTs_ are relatively data intensive. When you want to embed several hundred different ones in the same piece of software (which is the case in _G'MIC_), you quickly find yourself with a large volume of data to install and manage. For instance, our friends at [RawTherapee](https://rawpedia.rawtherapee.com/Film_Simulation) offer on their website an additional pack of **294** _CLUTs_ functions to download. All these _CLUTs_ are stored as `.png` files in a `.zip` archive with a total size of **402 MB**. Even if downloading and storing a few hundred _MB_ is no longer limiting nowadays, it is still quite large for things as simple as color changing filters.

This year, we have therefore carried out important research and development work at the GREYC lab on this topic. The result: a new lossy compression algorithm (_with visually imperceptible compression losses_) that can generate binary representations of _CLUTs_ with an average compression rate **of more than 99%**, relative to the data already _loslessy compressed_. The general idea is to determine an optimal set of color keypoints from which the _CLUT_ can be reconstructed (_decompression_), and this, with a minimal reconstruction error.

<figure>
<a href="https://gmic.eu/gmic270/fullsize/en_clut_compression.png">
<img src="https://gmic.eu/gmic270/thumb/en_clut_compression.png" alt="Principle of CLUT compression">
</a>
<figcaption><em>Fig.4.3: Principle of our CLUT compression technique, based on determining and storing a set of well-chosen keypoints.</em></figcaption>
</figure>

As a result, this original compression method allowed us to offer no less than **763 _CLUTs_** in _G'MIC_, all stored in a binary file that weights **less than 3 MB** !

All these color variation filters have been grouped into two separate entries in the _G'MIC-Qt_ plug-in, namely **"Colors / Simulate Film"** (for analog film simulations), and **"Colors / Color Presets"** (for other color transformations). Each of these filters provides sub-categories for a structured access to the hundreds of _CLUTs_ available. To our knowledge, this makes _G'MIC_ one of the image processing software with the most colorimetric transformations, while keeping a reasonable size.

Readers interested in the mathematical details of these _CLUT_ compression/decompression algorithms may refer to [the scientific paper](https://hal.archives-ouvertes.fr/hal-02066484v3/document) we wrote about it, as well as the presentation [slides](https://gmic.eu/gmic270/talk_en.pdf) that have been presented at the conferences [GRETSI'2019](http://gretsi.fr/colloque2019/) (French conference, in Lille) and [CAIP'2019](https://caip2019.unisa.it/) (International conference, in Salerno).

<figure>
<a href="https://gmic.eu/gmic270/talk_en.pdf">
<img src="https://gmic.eu/gmic270/thumb/en_clut_talk.png" alt="Algorithm presentation transparencies (in French)">
</a>
<figcaption><em>Fig.4.4: Presentation slides explaining the details of the CLUT compression/decompression algorithm.</em></figcaption>
</figure>

To finish with this topic, note that we have made [an open-source implementation](https://framagit.org/dtschump/libclut) of our decompression algorithm of _CLUTs_ available online (in _C++_, with 716 _CLUTs_ already included). [Discussions have also been initiated](https://discuss.pixls.us/t/3d-lut-module-in-darktable-2-7-dev) for a potential integration as a [Darktable](https://www.darktable.org/) module for managing _3D CLUTs_.

# 5. Create palettes by mixing colors

Let us now talk about the recent **"Colors / Colorful Blobs"** filter which is directly inspired by the original concept of [_Playful Palette_](https://research.adobe.com/project/playful-palette-an-interactive-parametric-color-mixer-for-artists/) created by the Adobe Research team in 2017. This filter is intended for illustrators (designers and digital painters). The goal: Create color palettes which contain only a few main colors (the ones you want to use in an illustration), but also a few sets of intermediate shades between these colors, in the form of color gradients. An artist is theoretically able to better preserve the color coherence of its artwork, by picking colors only from this palette.

<figure>
<a href="https://gmic.eu/gmic270/fullsize/colorful_blobs.png">
<img src="https://gmic.eu/gmic270/thumb/colorful_blobs.png" alt="Colors / Colorful Blobs filter in G'MIC-Qt">
</a>
<figcaption><em>Fig.5.1: **"Colors / Colorful Blobs"** filter allows you to create custom color palettes, by spatially mixing several colors together.</em></figcaption>
</figure>

As shown on the figure above, the filter allows the artist to create and move colored "blobs" that, when merged together, create the desired color gradients. The result of the filter is thus an image that the artist can use afterward as a custom <em>2D</em> color palette.

From a technical point of view, this filter is based on <em>2D</em> [_metaballs_](https://en.wikipedia.org/wiki/Metaballs) to model the color blobs. Up to twelve separate blobs can be added and different color spaces can be chosen for the calculation of the color gradient (_sRGB_, _Linear RGB_ or _Lab_). The filter also benefits from the recent development of the _G'MIC-Qt_ plug-in that enhances the user interactivity inside the preview widget (a [feature we mentioned in a previous report](https://pixls.us/blog/2018/08/g-mic-2-3-6/)), as seen in the animation below (see also this longer [video](https://www.youtube.com/watch?v=M1pSn1g7sC8)).

<figure>
<a href="https://gmic.eu/gmic270/original/colorful_blobs.gif">
<img src="https://gmic.eu/gmic270/original/colorful_blobs.gif" alt="Colors / Colorful Blobs filter - interactive use">
</a>
<figcaption><em>Fig.5.2: Illustration of the user interaction with the G'MIC palette creation filter, based on the creation and movement of colored "blobs".</em></figcaption>
</figure>

This filter may not be useful for most _G'MIC_ users. But you have to admit, it's pretty fun, isn't it?

# 6. Some more filters

Let us now describe a selection of a few other filters and effects added during the year, perhaps less original than the previous ones (but not completely useless anyway!).

  - First of all, the **"Rendering / Symmetric 2D Shape"** filter is a great help when you want to draw geometric shapes having angular symmetries.

    <figure>
<a href="https://gmic.eu/gmic270/original/symmetric2dshape.gif">
<img src="https://gmic.eu/gmic270/original/symmetric2dshape.gif" alt="Rendering / Symmetric 2D Shape filter - interactive use">
</a>
<figcaption><em>Fig.6.1: **"Rendering / Symmetric 2D Shape"** filter in action, in the G'MIC-Qt plug-in.</em></figcaption>
</figure>

    The plane can be subdivided into up to 32 angular pieces, each of which can contain a maximum of six keypoints to define a shape profile, allowing potentially complex and varied shapes to be rendered (such as the super-[shuriken](https://en.wikipedia.org/wiki/Shuriken) below!).

    <figure>
<a href="https://gmic.eu/gmic270/fullsize/symmetric2dshape.png">
<img src="https://gmic.eu/gmic270/thumb/symmetric2dshape.png" alt="Rendering / Symmetric 2D Shape filter - complex example">
</a>
<figcaption><em>Fig.6.2: Example of a complex symmetrical shape obtained with the **"Rendering / Symmetric 2D Shape"** filter.</em></figcaption>
</figure>

  - The **"Degradations / Self Glitching"** filter combines an image with a shifted version of itself, to create a [_Glitch-art_](https://en.wikipedia.org/wiki/Glitch_art) type image. Several bitwise operations (_Add_, _Mul_, _And_, _Or_, _Xor_,...) can be chosen and you can adjust the shift direction and amplitude, as well as various other controls.

    <figure>
<a href="https://gmic.eu/gmic270/fullsize/self_glitching.png">
<img src="https://gmic.eu/gmic270/thumb/self_glitching.png" alt="Degradations / Self Glitching Filter">
</a>
<figcaption><em>Fig.6.3: **"Degradations / Self Glitching"** filter helps to ruin your photos easily!</em></figcaption>
</figure>

     Again, this is not a filter that will necessarily be used every day! But it may be helpful for some people. It was actually added in response to a user request.

  - In the same style, the **"Degradations / Mess With Bits"** filter applies some arithmetic operations to the pixel values, seen as binary numbers (for instance, bit shift and bit inversion). Always with the idea of rendering _Glitch art_, of course!

    <figure>
<a href="https://gmic.eu/gmic270/fullsize/messwithbits.png">
<img src="https://gmic.eu/gmic270/thumb/messwithbits.png" alt="Degradations / Mess With Bits Filter">
</a>
<figcaption><em>Fig.6.4: **"Degradations / Mess With Bits"** filter, or how to transform an adorable toddler into a pustulating alien...</em></figcaption>
</figure>

  - The **"Degradations / Noise [Perlin]"** filter implements the generation of the [Perlin noise](https://en.wikipedia.org/wiki/Perlin_noise), a very classical noise model in image synthesis, used for the generation of elevation maps for virtual terrains. Here we propose a multi-scale version of the original algorithm, with up to four simultaneous variation scales.

    <figure>
<a href="https://gmic.eu/gmic270/fullsize/noise_perlin.png">
<img src="https://gmic.eu/gmic270/thumb/noise_perlin.png" alt="Degradations / Noise - Perlin filter">
</a>
<figcaption><em>Fig.6.5: **"Degradations / Noise [Perlin]"** filter proposes a multi-scale implementation of the Perlin noise (illustrated here with two variation scales).</em></figcaption>
</figure>

  - The **"Frames / Frame [Mirror]"** filter is also a "tailor-made" effect, to meet the needs of a _G'MIC-Qt_ plug-in user. This photographer wanted to resize his photos to obtain a precise _width/height_ ratio, but without having to crop his images. The solution was instead to add image information at the edges of the picture, by symmetry, in order to obtain the desired ratio. So that's what this filter does.

    <figure>
<a href="https://gmic.eu/gmic270/fullsize/frame_mirror.png">
<img src="https://gmic.eu/gmic270/thumb/frame_mirror.png" alt="Frames / Frame - Mirror Filter">
</a>
<figcaption><em>Fig.6.6: The **"Frames / Frame [Mirror]"** filter extends the image borders by symmetry.</em></figcaption>
</figure>

  - Finally, let us mention the upcoming advanced [image noise reduction filter](https://en.wikipedia.org/wiki/Non-local_means), by [Iain Fergusson](https://iainisbald.wordpress.com/), whose development is still in progress. Iain has been contributing to _G'MIC_ for several years now by implementing and experimenting original denoising filters, and his latest project seems really interesting, with promising results. [This video](https://www.youtube.com/watch?v=pPj_7J4iD_U) shows this filter in action, a good place to learn a little more about how it works.

Now that we've looked at these new filters, it seems important for us to remind that, as in many IT projects, this visible part of the iceberg hides a set of lower-level developments done to improve the interactive possibilities of the _G'MIC-Qt_ plug-in, as well as the performance of the internal scripting language interpreter ([the _G'MIC_ language](https://gmic.eu/reference.shtml)), which is how all these filters and effects are actually implemented. These improvements and incremental slight optimizations of the code base benefit to all filters (even those already available for several years) and it actually represents most of the development time we spend on _G'MIC_. So, dear users, do not be surprised if no new filters appear for a while. It is probably just because we are doing serious work on the _G'MIC_ framework core!

# 7. Other notable points in the project life

Here are listed some other important news that have punctuated the life of the project since August 2018.

## 7.1. We now accept donations!

This is essential news for us: since March 2019, the _G'MIC_ project has been granted permission to [**collect donations**](https://libreart.info/en/projects/gmic) (via _Paypal_), to help in its maintenance and development!

[![Cute kitten animation](https://gmic.eu/gmic270/original/chat_dons.gif)](https://gmic.eu/gmic270/original/chat_dons.gif)

This is a good thing, because until now, there was no simple way for a public research laboratory as the GREYC, to accept donations for supporting the development of a free software application such as _G'MIC_, an application used daily by several thousand people around the world. And we have currently no other ways to finance this piece of software in the long term.

Thus, we have partnered with [LILA](https://libreart.info/en/) (_Libre comme l'Art_), a French non-profit organization promoting Arts, Artists and Free Software, who accepted to collect donations for us.

<figure>
<a href="https://libreart.info/en/projects/gmic">
<img src="https://gmic.eu/gmic270/thumb/assoc_lila.png" alt="logo of the LILA association">
</a>
<figcaption><em>Fig.7.1: Logo of the LILA association, which collects donations for the G'MIC project.</em></figcaption>
</figure>

In practice, this is something that has been a little long to set up, but now that the donation system is operational, we hope to benefit from it in the future to make the project development even faster (the possible use of the raised funds is detailed on [the donations page](https://libreart.info/en/projects/gmic), this being of course very dependent on the amount of money collected).

For the sake of transparency, we will [post the monthly amount of collected donations](https://gmic.eu/gmic270/fullsize/donations_march.png) on the project website. At this point, we don't really know what to expect in practice. We will see how these donations evolve. Of course, we would like to thank all those who have already participated (or plan to do so) in supporting our open-source framework for image processing. Our ultimate dream would be, one day, to say that the illustration below is only a distant memory!

<figure>
<a href="https://gmic.eu/gmic270/fullsize/en_commitstrip.png">
<img src="https://gmic.eu/gmic270/thumb/en_commitstrip.png" alt="The reality of the development of the G'MIC project">
</a>
<figcaption><em>Fig.7.2: The harsh reality of the development of the G'MIC project ☺ ([illustration from the CommitStrip website](https://www.commitstrip.com/fr/2014/05/07/the-truth-behind-open-source-apps/)).</em></figcaption>
</figure>

## 7.2. Integrating "Smart Coloring" into GIMP

Let us also mention the work of [Jehan](https://girinstud.io/about/), known to PIXLS.US readers as a regular GIMP developer. Jehan has been hired by the GREYC laboratory in September 2018, to work on _G'MIC_ (for a 12-month fixed-term contract), thanks to a grant funded by the [INS2I Institute of the CNRS](https://ins2i.cnrs.fr/) (for which we are grateful).

One of its first missions was to re-implement the _G'MIC_ "Smart Coloring" algorithm ([that we had already talked about previously](https://pixls.us/blog/2017/06/g-mic-2-0)) as a new interactive mode integrated into the existing GIMP "_Bucket Fill_" tool.

<figure>
<a href="https://gmic.eu/gmic270/fullsize/smart_coloring.png">
<img src="https://gmic.eu/gmic270/thumb/smart_coloring.png" alt="Smart Coloring Algorithm">
</a>
<figcaption><em>Fig.7.3: G'MIC's "Smart Coloring" algorithm, now available in GIMP, helps illustrators color their drawings more quickly.</em></figcaption>
</figure>

Jehan described all his work in [a blog post](https://girinstud.io/news/2019/02/smart-colorization-in-gimp/), which is strongly recommended for reading. Of course, we don't want to copy his post here, but we want to mention this activity, and to consider it as another original contribution of the _G'MIC_ project to free software for graphic creation: at the GREYC laboratory, we are really happy and proud to have imagined and developed an image colorization algorithm, which artists can use through a well integrated tool into such a popular piece of software as GIMP!

This intelligent colorization algorithm has been the subject of [scientific publications](https://hal.archives-ouvertes.fr/hal-01891876), presentations at the conferences _GRETSI'2017_, _EuroGraphics VMV'2018_, as well as at the [_Libre Graphics Meeting'2019_](https://www.youtube.com/watch?v=3oHe0Y43dx8). And it is with a great pleasure we see this algorithm is used in real life, for various realizations (as in [this great video](https://www.youtube.com/watch?v=Z5THsjJGYcE&feature=youtu.be) of _GDQuest_, for colorizing sprites for video games, for instance).

Scientific research carried out in a public laboratory, which becomes available for the general public, that is what we want to see!

## 7.3. Other news related to the _G'MIC_ project

  - Recently, a major improvement in the performances of _G'MIC_ under _Windows_ has been achieved, by recoding the random number generator (now [reentrant](https://en.wikipedia.org/wiki/Reentrancy_(computing))) and removing some slow [mutex](https://en.wikipedia.org/wiki/Mutual_exclusion) which were responsible of performance drops for all filters requiring sequences of random numbers (and there were many!). As a result, some filters are accelerated by a factor of four to six under Windows!

  - Since December 2018, our _G'MIC-Qt_ plug-in is available for [_Paint.net_](https://en.wikipedia.org/wiki/Paint.net), a free graphic editing software application under _Windows_ (not open-source though). This has been possible thanks to the work of [Nicholas Hayes](https://github.com/0xC0000054) who wrote the [glue code](https://en.wikipedia.org/wiki/Glue_code) allowing the interaction between our _G'MIC-Qt_ plug-in and the host software. Users of Paint.net are now able to benefit from the 500+ filters offered by _G'MIC_. This plug-in, [available here](https://forums.getpaint.net/topic/113564-gmic-8-14-2019), has already been voted "_Best Plug-in of the Year 2018_" by the members of the _Paint.net_ forum ☺ !

  - Since October 2018, the _G'MIC-Qt_ plug-in for GIMP has been compiled and proposed for _MacOS_ by a new maintainer, [Andrea Ferrero](https://www.patreon.com/andreaferrero), who is also the main developer of the free software application [Photoflow](http://photoflowblog.blogspot.com/), a non-destructive image editor ([more information here](https://discuss.pixls.us/t/pre-compiled-gimp-plug-in-for-osx-ready-for-testing/)). Many thanks Andrea, for this wonderful contribution!

 - Since the announced shutdown of the _Google+_ social network, we have opened two new accounts, on [Framasphere](https://framasphere.org/people/b1132ee0b40a013639932a0000053625) and [Reddit](https://www.reddit.com/r/gmic), to share news about the project's life (but the [Twitter feed](https://twitter.com/gmic_ip) is still our most active account).

  - Let us also thank _Santa Claus_, who kindly brang us a materialized version of our mascot "Gmicky" last year. That looks almost perfect!

    <figure>
<a href="https://gmic.eu/gmic270/fullsize/gmicky_irl.png">
<img src="https://gmic.eu/gmic270/thumb/gmicky_irl.png" alt="Gmicky IRL">
</a>
<figcaption><em>Fig.7.4: The mascot "Gmicky", brought by Santa Claus, in December 2018.</em></figcaption>
</figure>

  - The _G'MIC_ project was presented at the [FENO](https://www.normandie.fr/feno), the "_Fête de l'Excellence Normande_", from 12 to 14 April 2019, at the Caen Exhibition Centre. We were hosted on the stand of the [_CNRS Normandie_](http://normandie.cnrs.fr/), and we carried out demonstrations of [style transfer (_teaser_)](https://gmic.eu/gmic270/fullsize/teaser_style_transfer.png) and [automatic illumination of clip arts (_teaser_)](https://gmic.eu/gmic270/fullsize/teaser_illumination2d.png), for the general public.

    <figure>
<a href="https://gmic.eu/gmic270/fullsize/feno.png">
<img src="https://gmic.eu/gmic270/thumb/feno.png" alt="FENO">
</a>
<figcaption><em>Fig.7.5: We were present at the CNRS stand, for G'MIC demonstrations, at the "Fête de l'Excellence Normande 2019" (FENO).</em></figcaption>
</figure>

- And to dig even deeper, here are some other external links we found interesting, and which mention _G'MIC_ in one way or another:
  + A [video presentation of the plug-in _G'MIC-Qt_](https://youtu.be/cshL2EjFdXc), by _Chris' Tutorial_;
  + The Youtube channel [_MyGimpTutorialChannel_](https://www.youtube.com/channel/UCPHIhisbs90ks4-4EsdXtpQ) offers a lot of videos showing how to use _G'MIC-Qt_ in GIMP to achieve various effects (mostly in German);
  + [_The Clinic_](https://www.theclinic.cl/), a Chilean weekly newspaper, apparently used _G'MIC_ [to achieve an effect on one of its covers](https://twitter.com/nacecontragolpe/status/1106917303587885056/photo/1) (via the smoothing filter **"Artistic / Dream Smoothing"**);
  + Another [video tutorial](https://www.youtube.com/watch?v=yv7a7R3gTFA), showing how to use the _G'MIC_ **"Artistic / Rodilius"** filter to create stylized animal photos.

# 8. The future

As you see, _G'MIC_ is still an active open-source project, and with its 11 years of existence, it can be considered as mature enough to be used "in production" (whether artistic or scientific).

We have never defined and followed a precise roadmap for the project development: the functionalities come according to the needs of the developers and users (and the limited time we can devote to it!). At the moment, there is a lot of interest in image processing methods based on neural networks, and [deep learning techniques](https://en.wikipedia.org/wiki/Deep_learning). It is therefore possible that one day, some of these methods will be integrated into the software (for instance, we already have a prototyped code running in _G'MIC_ that actually learns from image data with [convolutional neural networks](https://en.wikipedia.org/wiki/Convolutional_neural_network), but we are still at the prototyping stage...).

After 11 years of development (make it 20 years, if we include the development of the [_CImg_](http://cimg.eu) library on which _G'MIC_ is based), we have reached a point where the core of the project is, technically speaking, sufficiently well designed and stable, so as not to have to rewrite it completely in the next years. In addition, the number of features available in _G'MIC_ already covers a large part of the traditional image processing needs.

The evolution of this project may therefore take several paths, depending on the human and material resources that we will be able to devote to it in the future (for the development, but also in project management, communication, etc.). Achieving an increase in these resources will undoubtedly be one of the major challenges of the coming years, if we want _G'MIC_ to continue its progress (and we already have plenty of ideas for it!). Otherwise, this image processing framework might end up being just maintained in its current (and functional) state. It is of course with a hope for progression that we have recently set up [the donation page](https://libreart.info/en/projects/gmic). We also hope that other opportunities will soon arise to enable us to make this project more visible (you are invited to share this post if you like it!)

That's it for now, this long post is now over, thank you for holding on until the end, you can resume normal activity! I'll be happy to answer any questions in the comments.

----

**Post-scriptum**: Note that the 3D animation displayed as the _teaser_ image for this post has been actually generated by _G'MIC_, via the command `$ gmic x_starfield3d`. An opportunity to remind that _G'MIC_ also has its own _3D_ rendering engine capable of displaying simple objects, which is very practical for scientific visualization! We may have the occasion to talk about it again in a future post…

A special thank you for reviewing and helping to translate this article to:  
Patrick David, Sébastien Fourey, Christine Porquet, Ryan Webster.
