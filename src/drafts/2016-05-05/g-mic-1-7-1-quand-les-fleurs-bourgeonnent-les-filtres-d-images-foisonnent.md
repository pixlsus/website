URL:     https://linuxfr.org/news/g-mic-1-7-1-quand-les-fleurs-bourgeonnent-les-filtres-d-images-foisonnent
Title:   G'MIC 1.7.1 : quand les fleurs bourgeonnent, les filtres d'images foisonnent.
Authors: David Tschumperlé
         Xavier Claude, teoB, Benoît Sibaud, Christophe Turbout et ZeroHeure
Date:    2016-05-02T13:16:01+02:00
License: CC by-sa
Tags:    gimp, gmic, krita et traitement_image
Score:   16


La version **1.7.1** « _Spring 2016_ » de [_G'MIC_](http://gmic.eu) (_GREYC's Magic for Image Computing_), infrastructure libre pour le traitement d'images, a été publiée récemment, le 26 avril 2016. Nous continuons notre [série de présentation](//linuxfr.org/tags/gmic/public) des possibilités et des avancées de ce logiciel libre, avec la description des nouveautés et des améliorations notables introduites depuis [notre dernière dépêche](//linuxfr.org/news/g-mic-1-6-8-c-est-deja-noel-pour-les-traiteurs-d-images) sur ce sujet, datant de décembre 2015, qui avait été rédigée à l'occasion de la sortie de la version _1.6.8_. Trois versions successives ont été publiées depuis (les versions _1.6.9_, _1.7.0_ et _1.7.1_).
La deuxième partie de la dépêche détaille quelques uns des nouveaux filtres et effets disponibles dans le [greffon _G'MIC_](http://gmic.eu/gimp.shtml) pour [_GIMP_](http://www.gimp.org), qui reste l'interface de _G'MIC_ la plus utilisée à ce jour. Nous abordons aussi les autres évolutions diverses du projet comme l'amélioration et la création d'autres interfaces d'utilisation ainsi que les avancées « techniques » réalisées au cœur du _framework_.

----

[Le projet G'MIC](http://gmic.eu)
[Le greffon G'MIC pour GIMP](http://gmic.eu/gimp.shtml)
[Initiation à G'MIC en ligne de commande](http://gmic.eu/tutorial/basics.shtml)
[Documentation technique de référence](http://gmic.eu/reference.shtml)
[Série d'articles G'MIC sur Linuxfr](http://linuxfr.org/tags/gmic/public)

----

# 1. Le projet _G'MIC_ en quelques mots


_G'MIC_ est un projet libre ayant vu le jour en août 2008, dans l'équipe [_IMAGE_](https://www.greyc.fr/image) du laboratoire [_GREYC_](https://www.greyc.fr/fr/node/6) (Unité Mixte de Recherche du [_CNRS_](http://www.cnrs.fr) située à Caen / France). Cette équipe est composée de chercheurs et d'enseignant-chercheurs spécialisés dans les domaines de l'algorithmique et des mathématiques du traitement d'images. _G'MIC_ est distribué sous licence libre [_CeCILL_](http://www.cecill.info/licences/Licence_CeCILL_V2.1-fr.txt) (compatible _GPL_) pour différentes plateformes (_Linux, Mac et Windows_). Il fournit un ensemble d'interfaces utilisateurs variées pour la manipulation de données images _génériques_, à savoir des images ou des séquences d'[images hyperspectrales](https://en.wikipedia.org/wiki/Hyperspectral_imaging) 2D ou 3D à valeurs flottantes (ce qui inclut bien évidemment les images couleurs « classiques »).


![img](http://tschumperle.users.greyc.fr/lfr3/logo_gmic.png)
_Fig.1.1. Logo et (nouvelle) mascotte du projet G'MIC, logiciel libre pour le traitement d'image._


Notons qu'une première nouveauté relative au projet concerne _Gmicky_, la mascotte, qui a été entièrement redessinée, par [_David Revoy_](http://www.davidrevoy.com/static6/about-me), artiste français bien connu des amoureux du graphisme libre, puisqu'il est à l'origine du fameux webcomics [_Pepper&Carott_](http://www.peppercarrot.com/). Un grand merci à lui ! (à comparer avec l'ancien dessin de _Gmicky_ toujours visible [ici](http://gmic.eu/img/gmicky.png)).


_G'MIC_ s'est fait connaître essentiellement via son [greffon](http://gmic.eu/gimp.shtml) disponible pour le logiciel [_GIMP_](http://www.gimp.org), apparu en 2009, greffon qui propose plus de _460_ différents filtres et effets à appliquer sur vos images, et qui ressemble aujourd'hui à ceci :


![img](http://tschumperle.users.greyc.fr/lfr3/gmic_gimp171_s.png)
_Fig.1.2. Aperçu de la version 1.7.1 du greffon G'MIC pour GIMP._


Mais _G'MIC_ n'est pas qu'un greffon pour GIMP. Il fournit également une interface en [ligne de commande](http://gmic.eu/reference.shtml), qui peut s'utiliser de manière complémentaire aux outils _CLI_ proposés par [_ImageMagick_](http://www.imagemagick.org/) ou [_GraphicsMagick_](http://www.graphicsmagick.org). Cette interface _CLI_ est, comme on peut l'imaginer, l'interface la plus puissante et la plus flexible du _framework_. Il existe aussi un service web [_G'MIC Online_](https://gmicol.greyc.fr/) associé, pour appliquer des effets sur vos images directement à partir d'un navigateur web. D'autres interfaces basées sur _G'MIC_ sont également développées ([_ZArt_](https://www.youtube.com/watch?v=k1l3RdvwHeM), un greffon pour [_Krita_](http://www.krita.org), des filtres pour [_Photoflow_](http://photoflowblog.blogspot.fr/)...) mais leur usage reste pour le moment plus confidentiel. Toutes ces interfaces se basent sur les bibliothèques _C++_ [_CImg_](http://cimg.eu) et [_libgmic_](http://gmic.eu/libgmic.shtml) qui sont portables, thread-safe et multi-threadées (via l'utilisation d'[_OpenMP_](http://openmp.org/)). Aujourd'hui, _G'MIC_ possède plus de [_900_ fonctions](http://gmic.eu/reference.shtml) différentes de traitement d'images, toutes paramétrables, pour une bibliothèque de seulement _6 Mio_ correspondant à un peu plus de _150 kloc_ de code source. Les fonctionnalités proposées couvrent un large spectre du traitement d'images, en proposant des algorithmes pour la manipulation géométrique, les changements colorimétriques, le filtrage d'image (débruitage, rehaussement de détails par méthodes spectrales, variationnelles, non-locales...), l'estimation de mouvement / le recalage, l'affichage de primitives (jusqu'aux objets 3d maillés), la détection de contours/la segmentation, le rendu artistique, etc. C'est donc un outil très générique aux usages variés, très utile d'une part pour convertir, visualiser et explorer des données images, et d'autre part pour construire des pipelines personnalisés et élaborés de traitements d'images (voir [ces transparents de présentation du projet](http://issuu.com/dtschump/docs/gmic_slides) pour plus d'information sur les motivations et les buts de ce projet).


# 2. Sélection de nouveaux filtres et effets


Nous proposons ici un résumé des nouveaux filtres et effets les plus marquants récemment développés, et illustrons leur usage depuis le greffon _G'MIC_ pour _GIMP_. Ces filtres sont bien sûr utilisables également depuis les autres interfaces disponibles (notamment avec [`gmic`](http://gmic.eu/reference.shtml), l'interface en ligne de commande). Nous nous sommes restreints aux filtres les plus intéressants à expliquer et illustrer, car en réalité, ce sont plus d'une vingtaine de nouveaux filtres et effets qui ont fait leur apparition depuis la version _1.6.8_.


## 2.1. Création de peintures à partir de photographies


Le filtre __Artistic / Brushify__ tente de transformer une image en _peinture_. L'idée ici est de simuler (de manière simplifiée) le processus de création d'une peinture sur une toile blanche. On fournit une image _modèle_ à l'algorithme, qui va dans un premier temps, analyser sa géométrie (principalement le contraste et l'orientation des contours), puis tenter de la _repeindre_ en utilisant comme outil un unique pinceau (_brush_ en anglais, d'où le nom de l'effet) qui va s'orienter localement pour s'adapter à la géométrie des contours de l'image.
En simulant suffisamment de coups de pinceaux, on obtient une image « peinte » plus ou moins fidèle à l'image modèle d'origine, en fonction de la forme et de la taille du pinceau utilisé, du nombre d'orientations autorisées, etc. Tout ceci étant réglable par l'utilisateur comme des paramètres de l'algorithme : ce filtre permet donc d'obtenir une grande variété de rendus différents.


![img](https://tschumperle.users.greyc.fr/lfr3/gmic_brushify.jpg)
_Fig.2.1.1. Apercu du filtre « Brushify » dans le greffon G'MIC pour GIMP. La brosse qui va être utilisée par l'algorithme est visible en haut à gauche._


L'animation ci-dessous illustre cette grande diversité de résultats, avec le traitement d'une même image d'entrée (photographie d'une tête de lion), en variant les types de brosses et les paramètres utilisés par l'algorithme. _Brushify_ peut être assez coûteux en termes de temps de calcul (suivant le nombre de coups de pinceaux à simuler), même si l'implémentation de l'algorithme est déjà parallélisée (les différents coeurs de calcul pouvant donner des coups de pinceaux simultanément).


![img](https://tschumperle.users.greyc.fr/lfr3/brushify2.gif)
_Fig.2.1.2. Quelques exemples de rendus du filtre « Brushify » à partir d'une même image d'entrée, en utilisant des brosses différentes._


À noter qu'il est amusant d'invoquer ce filtre à partir de la ligne de commande (grâce à la fonction `-brushify` disponible dans `gmic`), pour traiter des lots d'images et des vidéos ([un exemple de vidéo « brushifiée »](https://www.youtube.com/watch?v=tf_fMzS3UyQ&feature=youtu.be)).


## 2.2. Reconstruction de données manquantes à partir d'échantillons épars


_G'MIC_ se dote d'une nouvelle fonctionnalité de reconstruction de données manquantes dans des images. Nous avons déjà évoqué ce problème classique de reconstruction en traitement d'images dans des dépêches précédentes (avec l'_inpainting_ comme illustré [ici](http://linuxfr.org/news/g-mic-1-6-8-c-est-deja-noel-pour-les-traiteurs-d-images#31-inpainting-reconstruction-dimage) ou encore [ici](http://linuxfr.org/news/g-mic-1-5-8-3-quelques-avancees-supplementaires-pour-le-traitement-d-image-libre#effet--repair--inpaint-patch-based)). La nouvelle méthode d'interpolation ajoutée suppose quant à elle que l'on ne dispose que de _données connues éparses_, par exemple quelques pixels de couleurs dispersés ça et là dans l'image, plutôt que des blocs entiers de données contiguës connues. L'analyse et la reconstruction de la géométrie des structures présentes dans l'image devient alors un problème particulièrement difficile.


La nouvelle fonction `-solidify` de _G'MIC_ permet de reconstruire des données images denses à partir de quelques points épars connus, en utilisant une technique de reconstruction multi-échelle basée sur les [_EDP_](https://en.wikipedia.org/wiki/Diffusion_equation) de diffusion. La figure ci-dessous illustre les capacités de cette méthode, avec un exemple de reconstruction d'une [image de goutte d'eau](https://www.flickr.com/photos/jfrogg/5810936597/in/photolist-9Ruz12-oHDr6x-8VW83C-iM2cR1-oXCyji-nTGYXY-oavqFt-5emqwQ-8Qx6Nx-pkREpT-nYhS8D-najxb9-a3XHVZ-jUq3Aw-qGTeCo-r2yj33-pvci15-p7WnqP-ajPFM1-7SquY5-6busU-7B5iLy-9Av8Kr-4jZ6zq-b2anbD-c2LF73-aiQ5Ta-cdTWpb-ob7FJx-aohzY1-razwT3-p5rXdc-fCvsV3-4N8vKM-4Nhy4z-4HVUCr-eMUCnQ-bqJnaX-6CuzQd-qCYpsk-NzLkj-hYUtqE-oVbqnh-4H1DkM-r4ArWu-drpZHp-pHbCDL-8Zr8K1-xxf3Q9-e8dK5N). On ne garde ici que 2,7% des données image (ce qui est vraiment peu !) et l'algorithme reconstruit une image entière, qui ressemble à celle d'origine (même si, bien entendu, tous les détails de l'image originale n'ont pas été reconstruits complètement). Plus on dispose d'échantillons, plus on est capable de reconstruire des détails.


![img](https://tschumperle.users.greyc.fr/lfr3/waterdrop2.gif)
_Fig.2.2.1. Reconstruction d'une image à partir d'un échantillonnage épars._


Cette technique de reconstruction étant assez générique, plusieurs filtres différents se basant sur celle-ci ont pu être élaborés et ajoutés dans _G'MIC_ :


- Le filtre __Repair / Solidify__ permet d'appliquer l'algorithme de reconstruction de manière directe, en reconstruisant par interpolation les zones marquées comme transparentes dans les images d'entrées. L'animation ci-dessous montre l'application de ce filtre pour la réalisation d'un effet de flou artistique sur les bords d'une image.


![img](https://tschumperle.users.greyc.fr/lfr3/gmic_sol.gif)
_Fig.2.2.2. Aperçu du filtre « Solidify » dans le greffon G'MIC pour GIMP._


D'un point de vue artistique, les possibilités de ce filtre sont nombreuses. Il est par exemple très utile pour générer simplement des dégradés de couleurs de formes complexes dans des images, comme le montre les deux exemples de la figure ci-dessous (ou encore [cette vidéo](https://www.youtube.com/watch?v=rgLQayllv-g), qui détaille le processus) 


![img](https://tschumperle.users.greyc.fr/lfr3/gmic_solidify2.jpg)
_Fig.2.2.3. Utilisation du filtre « Solidify » de G'MIC pour créer simplement des dégradés de couleurs aux structures géométriques complexes (images d'entrées à gauche, résultats du filtre à droite)._


- Le filtre __Artistic / Smooth abstract__ reprend le principe utilisé pour l'image de la goutte d'eau vu précédemment : il échantillonne une image de manière éparse, en plaçant des points clés préférentiellement sur les contours présents dans celle-ci, puis tente de reconstruire l'image entière à partir de ces échantillons seuls. Si le nombre d'échantillons est faible, le filtre va génèrer une image _continue par morceaux_ qui peut donc être vue comme une abstraction lisse de l'image d'origine (voir la figure ci-dessous).


![img](https://tschumperle.users.greyc.fr/lfr3/smooth_abstract.jpg)
_Fig.2.2.4. Aperçu du filtre « Smooth abstract » dans le greffon G'MIC pour GIMP._


- Le filtre __Rendering / Gradient [random]__ permet quant à lui la création de fonds colorés. Le filtre plaçe des points de couleurs aléatoirement sur une image, et les interpole ensuite spatialement avec l'algorithme de reconstruction. On obtient facilement des fonds d'écrans psychédéliques composés de dégradés de couleurs qui partent dans toutes les directions (voir figure ci-dessous).


![img](https://tschumperle.users.greyc.fr/lfr3/gradient_random.jpg)
_Fig.2.2.5. Aperçu du filtre « Gradient [random] » dans le greffon G'MIC pour GIMP._


- __Simulation de films argentiques__ : ce nouvel algorithme de reconstruction d'images à partir d'échantillons épars a également une grande utilité pour les nombreux filtres de simulation de films argentiques, présents dans _G'MIC_ depuis quelques années déjà. La section __Film emulation__ propose en effet un grand choix de filtres dont le but est d'appliquer des transformations colorimétriques, pour simuler le rendu qu'aurait eu une photo numérique si elle avait été prise avec un appareil argentique muni d'un certain type de pellicule. La figure ci-dessous montre par exemple quelques unes des _300_ transformations colorimétriques qu'il est possible d'appliquer à partir de _G'MIC_.


![img](https://tschumperle.users.greyc.fr/lfr3/gmic_clut1.jpg)
_Fig.2.2.6. Quelques unes des transformations colorimétriques disponibles dans G'MIC (parmi + de 300)._


D'un point de vue algorithmique, ces algorithmes de transformation colorimétrique sont très simples à mettre en œuvre : on dispose pour chacune des 300 transformations d'une [_HaldCLUT_](http://www.quelsolaar.com/technology/clut.html), c'est-à-dire d'une fonction définissant pour chaque couleur _(R,G,B)_ des pixels de l'image originale, une nouvelle couleur _(R,G,B)_ à attribuer aux pixels de l'image résultante. Cette fonction n'étant pas forcément analytique, une _HaldCLUT_ est généralement stockée sous forme discrétisée, et donne donc le résultat de la transformation colorimétrique _pour toutes les couleurs possibles_ du cube _RGB_ (soit _2^24 = 16777216_ valeurs si on travaille avec une précision de _8bits_ par composante). La figure ci-dessous illustre la façon dont une transformation colorimétrique basée _HaldCLUT_ s'applique sur l'ensemble des couleurs du cube _RGB_.


![img](https://tschumperle.users.greyc.fr/lfr3/gmic_clut0.jpg)
_Fig.2.2.7. Principe d'une transformation colorimétrique utilisant une HaldCLUT._


Autant dire que, même en sous-échantillonnant l'espace _RGB_ (sur _6 bits_ par composante par exemple) et en compressant sans perte le fichier de transformation colorimétrique correspondant, on se retrouve vite avec un fichier qui est relativement volumineux (entre _200_ et _300_ Kio par fichier). Multipliez ce nombre par _300_ (le nombre de transformations colorimétriques disponibles dans _G'MIC_), et vous arrivez à un total de _85 Mio_ environ pour stocker l'ensemble de ces transformations. Un peu lourd à diffuser pour de simples filtres de changement de couleurs !


L'idée était donc de développer une méthode de compression avec pertes qui pourrait s'adapter spécifiquement aux données de type _HaldCLUT_, c'est-à-dire à des fonctions volumiques discrétisées à valeurs vectorielles, qui sont par nature relativement lisses par morceaux. C'est donc ce qui a été fait, en se basant sur l'algorithme de reconstruction de données images à partir d'échantillons épars. Cet algorithme fonctionne en effet avec des données images pouvant être volumiques. Il suffit donc d'extraire un nombre suffisant de points-clés significatifs dans le cube _RGB_ pour permettre la reconstruction d'une _HaldCLUT_ entière, avec une erreur de reconstruction suffisamment faible pour que le résultat de la transformation colorimétrique résultante soit indistinguable de la transformation colorimétrique originale.


![img](https://tschumperle.users.greyc.fr/lfr3/gmic_clut2.jpg)
_Fig.2.2.8. Principe du codage et de la reconstruction d'une HaldCLUT à partir d'un nuage de points clés définit dans le cube RGB._


Donc, au lieu de stocker l'ensemble des couleurs d'une _HaldCLUT_, on n'en stocke plus qu'un sous-ensemble épars représenté par une liste de _{ point-clés, couleurs }_, et on laisse l'algorithme de reconstruction faire son travail pour regénérer la _HaldCLUT_ entière, avant de l'appliquer sur l'image à modifier. Suivant la complexité des _HaldCLUTs_ à appliquer, plus ou moins de points clés sont nécessaires (ça peut varier de  _30_ à _2000_). 
Résultat des courses : On passe de _85 Mio_ pour le stockage des _300_ _HaldCLUTs_ de _G'MIC_ à _850 Kio_, soit un gain de compression de _99%_ ! D'un point de vue pratique, ce nouveau fichier décrivant toutes les _HaldCLUTs_ compressées est facilement distribuable et installable avec le greffon, et un utilisateur peut donc appliquer toutes les transformations colorimétriques de _G'MIC_ en restant _hors-ligne_ (alors qu'auparavant, chaque _HaldClUT_ était téléchargée lors de l'application d'une nouvelle transformation colorimétrique).


Ce nouvel algorithme de reconstruction d'images à partir d'échantillons épars a donc beaucoup d'intérêt, et nul doute qu'il sera réutilisé dans d'autres filtres prochainement.


## 2.3. Rendre des textures périodiques



Le filtre __Arrays & tiles / Make seamless [patch-based]__ permet de transformer une texture d'entrée en la rendant _tuilable_, c'est-à-dire en permettant sa répétition sous forme de _tuiles_ le long des axes horizontaux et verticaux, sans que l'on distingue de discontinuités visibles lorsque les bords de deux tuiles adjacentes sont mises bout à bout. C'est une opération qui peut s'avérer très difficile à réaliser si la texture d'entrée est complexe, par exemple avec peu d'auto-similarité, ou avec des changements de luminosités flagrants.
C'est le cas de l'exemple illustré dans la figure ci-dessous, avec une texture _chair de saumon_ présentée sous forme de 4 tuiles disposées en configuration _2x2_. L'éclairage de cette texture varie de gauche à droite (du plus sombre vers le plus clair). L'algorithme proposé permet ici de transformer la texture pour que le recollement devienne quasiment invisible. Notons que l'on cherche ici à préserver la texture d'entrée le plus possible, contrairement à l'algorithme de [re-synthèse de texture](http://linuxfr.org/news/g-mic-1-6-8-c-est-deja-noel-pour-les-traiteurs-d-images#32-re-synth%C3%A8se-de-textures) qui était déja disponible, et qui cherchait plutôt à recréer de toute pièces une instance aléatoire d'une texture de taille quelconque ayant les mêmes caractéristiques que la texture modèle. Essayez de réaliser ceci manuellement, et vous vous rendrez compte de la difficulté du problème (qui pourrait paraître simple au premier abord).


![img](https://tschumperle.users.greyc.fr/lfr3/seamless1.gif)
_Fig.2.3.1. Aperçu du filtre « Make Seamless » du greffon G'MIC pour GIMP, pour rendre des textures tuilables._


À noter que la création de ce nouveau filtre d'aide au tuilage a été suggérée par [rewind](//linuxfr.org/users/rewind) dans [les commentaires](//linuxfr.org/nodes/107604/comments/1634699) de la dépêche précédente sur G'MIC ! Les grands esprits se rencontrent sur _LinuxFr.org_ :)
On peut imaginer de belles applications à ce type de filtres, notamment dans le domaine du jeu vidéo où tuiler des textures pour créer de grands mondes virtuels est monnaie courante. Un autre exemple de tuilage d'une texture complexe de mousse en (tuilage _2x2_) est présenté dans l'animation ci-dessous.


![img](https://tschumperle.users.greyc.fr/lfr3/seamless2.gif)
_Fig.2.3.2. Résultat du filtre « Make seamless » de G'MIC pour rendre tuilable une texture de mousse._


## 2.4. Décomposition d'une image en niveaux de détails


Un nouveau filtre de décomposition d'image en plusieurs niveaux de détails nommé __Details / Split details [wavelets]__ a également été ajouté. Il implémente un algorithme de décomposition en ondelettes à trous. Pour les connaisseurs, c'est exactement le même algorithme que celui qui est proposé dans le greffon populaire [_Wavelet Decompose_](http://registry.gimp.org/node/11742) pour _GIMP_, avec ici en plus, une prévisualisation des échelles de détails et une implémentation parallélisée, tirant parti du multi-coeurs. La figure ci-dessous illustre son action sur un portrait. L'application de ce filtre décompose une image en plusieurs calques de sortie, de telle manière à ce que chaque calque contienne les détails de l'image à une échelle donnée, et que l'ensemble de ces calques de sortie superposés redonne bien évidemment le rendu de l'image d'origine.


![img](https://tschumperle.users.greyc.fr/lfr3/gmic_wavelets.jpg)
_Fig.2.4.1. Aperçu du filtre de décomposition d'image par ondelettes dans le greffon G'MIC pour GIMP._


On peut ainsi travailler sur chaque calque séparément, et ne modifier les détails de l'image que pour une échelle donnée. Il y a de nombreuses applications à ce type de décomposition, l'une des plus spectaculaires étant la possibilité de retoucher la peau dans des photos de portraits : les imperfections de la peau se retrouvent généralement sur les calques correspondant à des échelles de détails _moyens_, alors que la texture naturelle de la peau (les pores) se retrouvent sur les échelles de détails _fins_, et on peut donc sélectivement effacer les imperfections tout en conservant une texture de peau naturelle après retouche (voir l'animation ci-dessous ou encore [ce lien](http://blog.patdavid.net/2011/12/getting-around-in-gimp-skin-retouching.html) pour un tutoriel détaillé de la procédure, en utilisant _GIMP_).
Vous avez sans doute déjà vu des photos publicitaires de mannequins ayant une peau exagérément lisse (façon poupée barbie). Dans ce cas, vous savez maintenant que l'infographiste responsable a vraiment fait une retouche de goret ! (le bien-fondé de l'utilité de telles retouches est un autre débat dans lequel on ne se risquera pas ici).


![img](https://tschumperle.users.greyc.fr/lfr3/skin.gif)
_Fig.2.4.2. Un exemple d'utilisation du filtre de décomposition d'image en ondelettes, pour la retouche réaliste de la peau sur un portrait (suppression des imperfections)._


## 2.5. Débruitage d'images par méthode « Patch-PCA »


_G'MIC_ est aussi connu pour posséder de nombreux algorithmes variés de _débruitage_ et de _lissage_ d'images (plus d'une quinzaine à ce jour). Et bien, il en a maintenant un de plus ! __Repair / Smooth [patch-pca]__ est un nouvel algorithme de débruitage d'image performant, basé [_patch_](https://fr.wikipedia.org/wiki/Patch) qui a été ajouté à _G'MIC_. C'est un algorithme parallélisé, mais _très coûteux_ en temps de calcul (probablement à éviter sur des machines à moins de 8 coeurs...). En contrepartie, il est capable de débruiter certaines images de façon parfois spectaculaire, en supprimant le bruit et préservant les détails de l'image, comme l'illustre la figure ci-dessous, avec une image contenant un niveau de bruit assez important. (En passant, merci à [Jérome Boulanger](http://umr144.curie.fr/fr/profile/j-r-me-boulanger-002161) pour ses conseils d'expert sur ce sujet).


![img](https://tschumperle.users.greyc.fr/lfr3/patchpca.jpg)
_Fig.2.5.1. Résultat du nouvel algorithme de débruitage d'image basé « patch » de  G'MIC_.


## 2.6. Effet « Droste » : la mise en abyme continue


[L'effet Droste](https://en.wikipedia.org/wiki/Droste_effect) (aussi appelé _mise en abyme_) du nom de la marque de cacao ayant utilisé cet effet dans une de ses publicités, consiste à dessiner une partie de l'image dans elle-même, et ceci de manière récursive. Un filtre __Deformations / Continuous droste__ a été récemment ajouté à _G'MIC_, mais n'a en réalité rien de très nouveau puisque c'est « juste » une réécriture complète du [filtre Droste](https://www.flickr.com/groups/88221799@N00/discuss/72157601071820707/) qui était déjà disponible dans le greffon [_Mathmap_](https://www.complang.tuwien.ac.at/schani/mathmap/) depuis quelques années. _Mathmap_ était un greffon populaire pour _GIMP_, mais il ne semble plus évoluer, ni même maintenu, et l'effet Droste était l'un de ses filtres les plus complexes et les plus emblématiques. _Martin « Souphead »_, un ancien utilisateur de _Mathmap_ a donc pris le taureau par les cornes et s'est attelé à la conversion de ce filtre pour _G'MIC_. L'intérêt c'est qu'au passage, l'implémentation devient parallélisée. Pour celles et ceux intéressés par les aspects mathématiques de l'effet _Droste_, on ne peut que recommander la lecture de [cette page didactique](http://images.math.cnrs.fr/L-effet-Droste.html) rédigée par un chercheur du _CNRS_, page qui contient des résultats amusants de création de séquences périodiques d'images utilisant cette effet.


![img](https://tschumperle.users.greyc.fr/lfr3/droste0.jpg)
_Fig.2.6.1. Aperçu du nouveau filtre « Droste » pour la création d'une mise en abyme, dans le greffon G'MIC pour GIMP._


Avec ce filtre, tous les délires artistiques sont permis. Il est par exemple trivial de créer en quelques clics de souris le résultat présenté dans la figure ci-dessous : il suffit de détourer l'horloge, de rendre le fond transparent, et d'appliquer le filtre _Droste_ de _G'MIC_, _et voilà_ ! (à ne pas montrer aux gens stressés par le temps qui passe...).


![img](https://tschumperle.users.greyc.fr/lfr3/droste2.jpg)
_Fig.2.6.2. Exemple de transformation d'image possible avec le filtre « Droste » de G'MIC._


## 2.7. Transformation équirectangulaire <-> zénith/nadir


Le filtre __Deformations / Equirectangular to nadir-zenith__ est également un filtre initialement disponible dans _Mathmap_ et qui a été transposé pour _G'MIC_. C'est un filtre utilisé dans le domaine assez restreint du traitement d'images de panoramas utilisant une [projection cylindrique équidistante](https://fr.wikipedia.org/wiki/Projection_cylindrique_%C3%A9quidistante). Un tel panorama est en général obtenu comme la fusion de plusieurs photographies prises à des angles différents, la fusion étant effectuée de manière algorithmique (par exemple avec le logiciel libre [Hugin](http://hugin.sourceforge.net/)). Lors de la fusion, il est très fréquent que des pans entiers d'images manquent dans le panorama généré, notamment au niveau des vues de dessus et de dessous (le [_zénith_](https://fr.wikipedia.org/wiki/Z%C3%A9nith_(astronomie)) et le [_nadir_](https://fr.wikipedia.org/wiki/Nadir_(astronomie)), voir un exemple dans la figure ci-dessous).


![img](https://tschumperle.users.greyc.fr/lfr3/zenith0.jpg)
_Fig.2.7.1. Panorama obtenu par outil de fusion d'image. Certaines parties de l'image (zénith et nadir) sont manquantes._


Il est souhaitable de pouvoir resynthétiser l'information manquante dans ces zones. Mais comment faire ? La déformation induite par la projection cylindrique équidistante fait que la reconstruction directe est difficile dans ces zones (l'utilisation de l'outil de [_clonage_](https://docs.gimp.org/fr/gimp-tool-clone.html) n'est pas adapté par exemple). C'est là que le filtre de _G'MIC_ intervient, en permettant de recréer des vues _applaties_ du zénith et du nadir.


![img](https://tschumperle.users.greyc.fr/lfr3/zenith1.jpg)
_Fig.2.7.2. Récupération des vues applaties du zénith et du nadir de l'image précédente, grâce au filtre G'MIC du greffon pour GIMP._



Une fois ces vues calculées, il devient plus facile de boucher les trous, en utilisant par exemple un filtre de reconstruction de type _Inpainting_ ou l'outil de clonage si on préfère faire ça manuellement.


![img](https://tschumperle.users.greyc.fr/lfr3/zenith2.jpg)
_Fig.2.7.3. Rebouchage des trous, par une technique quelconque (« inpainting »  ou outil de « clonage » par exemple)._


Il suffit ensuite d'invoquer ce même filtre, en inversant cette fois la transformation, et de réinsérer les zénith/nadir reconstruits dans l'image panorama originale, et le tour est joué. On obtient une belle image panorama complète (voir figure ci-dessous). Notez comme la déformation de l'image est importante dans ces zones, et comment il aurait été difficile de reboucher les trous en agissant directement sur l'image du panorama original.


![img](https://tschumperle.users.greyc.fr/lfr3/zenith3.jpg)
_Fig.2.7.4. Application de la transformation inverse, et insertion dans le panorama d'origine._



Les images présentées dans cette section ont été aimablement fournies par [_Morgan Hardwood_](https://plus.google.com/u/0/b/117441237982283011318/115320419935722486008/posts). _Morgan_ a d'ailleurs écrit un tutoriel détaillé sur cette technique de rebouchage d'images de panoramas, qui est [consultable ici](https://discuss.pixls.us/t/panography-patching-the-zenith-and-nadir/585).


# 3. Autres améliorations et faits notables



Pour finir, voici en vrac quelques points marquants concernant le développement du projet _G'MIC_ :


- Le filtre __Rendering / Kitaoka Spin Illusion__ est une autre conversion d'un filtre _Mathmap_ réalisé par _Martin « Souphead »_. Il permet de générer un certain type d'[illusions d'optiques](http://www.ritsumei.ac.jp/~akitaoka/index-e.html) comme le montre la figure ci-dessous (si vous êtes épileptiques, un conseil, fermez les yeux !)


![img](https://tschumperle.users.greyc.fr/lfr3/spin2.jpg)
_Fig.3.1. Résultat du filtre « Kitaoka Spin Illusion »._


- Le filtre __Colors / Color blindness__ transforme une image en simulant différents types de [daltonisme](https://fr.wikipedia.org/wiki/Daltonisme). Ce filtre peut être utile pour tester l'accessibilité de sites ou de documents graphiques aux daltoniens. Nous avons repris les transformations colorimétriques dont le lien apparaît sur le site [_Coblis_](http://www.color-blindness.com/coblis-color-blindness-simulator/), site qui propose également ce genre de simulation, en ligne. Les résultats obtenus avec le filtre _G'MIC_ sont donc à priori strictement identiques, mais peuvent s'effectuer facilement sur des lots d'images par exemple.


![img](https://tschumperle.users.greyc.fr/lfr3/gmic_cb.jpg)
_Fig.3.2. Aperçu du filtre de simulation de différents types de daltonisme dans le greffon G'MIC pour GIMP._



- Depuis quelques années maintenant, _G'MIC_ intègre un évaluateur d'expressions mathématiques, très commode pour réaliser des calculs lors de l'application de filtres (nous en avions d'ailleurs déjà longuement parlé [lors de la dépêche précédente](http://linuxfr.org/news/g-mic-1-6-8-c-est-deja-noel-pour-les-traiteurs-d-images#4-un-%C3%A9valuateur-dexpressions-plus-performant)). Cet évaluateur d'expression se dote de nouvelles fonctionnalités intéressantes, en particulier la possibilité de faire du calcul avec des variables de type complexe, vectoriel ou matriciel, mais aussi de créer ses propres fonctions mathématiques personnalisées. Par exemple, l'implémentation classique du rendu de [l'ensemble de _Mandelbrot_](https://fr.wikipedia.org/wiki/Ensemble_de_Mandelbrot), réalisé en estimant la convergence d'une suite complexe, peut s'écrire directement de la façon suivante en ligne de commande:


``````````sh
$ gmic 512,512,1,1,"c = 2.4*[x/w,y/h] - [1.8,1.2]; z = [0,0]; for (iter = 0, cabs(z)<=2 && ++iter<256, z = z**z + c); 6*iter" -map 7,2
``````````


![img](https://tschumperle.users.greyc.fr/lfr3/gmic_mand.jpg)
_Fig.3.3. Utilisation de l'évaluateur d'expression mathématiques de G'MIC pour calculer un rendu de l'ensemble de Mandelbrot._


Les possibilités de calcul en sont grandement développée, puisque l'on n'est plus limité à l'utilisation de variables scalaires, mais qu'on peut définir des filtres qui, pour chaque pixel d'une image d'entrée, vont pouvoir effectuer rapidement des résolutions de systèmes linéaires ou encore des décompositions en valeurs propres/vecteurs propres. C'est un peu comme si on disposait d'un mini-(mini)-[_Octave_](https://www.gnu.org/software/octave/) à l'intérieur de _G'MIC_. Le filtre _Brushify_ décrit plus haut utilise d'ailleurs de manière intensive ces nouvelles possibilités. À noter que cet évaluateur d'expression possède son propre [_JIT_](https://fr.wikipedia.org/wiki/Compilation_%C3%A0_la_vol%C3%A9e) pour accélérer le calcul d'une expression lorsqu'elle est réalisée sur plusieurs milliers de valeurs simultanément.


- Une autre contribution technique importante a été apportée par [_Tobias Fleischer_](https://plus.google.com/+TobiasFleischer/posts), avec la création d'une [_API_](https://fr.wikipedia.org/wiki/Interface_de_programmation) _C_ pour appeler les fonctions de la bibliothèque [_libgmic_](http://gmic.eu/libgmic.shtml) (bibliothèque des fonctionnalités de _G'MIC_ possédant initialement une _API_ _C++_). Comme l'[_ABI_](https://fr.wikipedia.org/wiki/Application_binary_interface) _C_ est standardisée (contrairement à celle du _C++_), _G'MIC_ peut donc plus facilement s'interfaçer avec d'autres langages que le _C++_. On peut par exemple imaginer dans le futur la création d'_APIs_ _G'MIC_ pour des langages, comme _Python_. En passant : si quelqu'un est motivé pour réaliser ce genre de choses, qu'il n'hésite surtout pas à nous contacter ! _Tobias_ utilise actuellement cette nouvelle _API_ _C_ pour développer des greffons basés sur _G'MIC_ respectant l'_API_ [_OpenFX_](https://en.wikipedia.org/wiki/OpenFX_%28API%29). Ces greffons devraient donc être utilisables indifféremment dans des logiciels d'édition vidéo comme [After effects](https://fr.wikipedia.org/wiki/Adobe_After_Effects), [Sony Vegas Pro](https://fr.wikipedia.org/wiki/Sony_Vegas_Pro) ou encore [Natron](http://www.natron.fr/) (voir figure ci-dessous). C'est un travail qui est toujours en cours.


![img](https://tschumperle.users.greyc.fr/lfr3/gmic_natron.jpg)
_Fig.3.3. Aperçu des greffons OpenFX basés sur G'MIC, tournant sous Natron._


- Un autre contributeur [_Robin « Starfall Robles »_](https://github.com/Starfall-Robles) a initié le développement d'un [script Python](https://github.com/Starfall-Robles/Blender-2-G-MIC) permettant [d'intégrer des fonctionnalités de _G'MIC_ dans _Blender_](http://www.blendernation.com/2016/04/27/creative-imagery-blender-2-gmic/)
(plus précisément dans son éditeur de séquence vidéo _VSE_). Ce script très récent, toujours en cours de développement, permet déjà d'appliquer différents effets _G'MIC_ sur des séquences d'images, comme vous pouvez le voir sur la figure ci-dessous (et sur [cette vidéo de démonstration](https://www.youtube.com/watch?v=TSzoEXAV1zs)).


![img](https://tschumperle.users.greyc.fr/lfr3/gmic_blender2.jpg)
_Fig.3.4. Aperçu du script d'interfaçage G'MIC fonctionnant dans le VSE de Blender._


- Certaines fonctionnalités de _G'MIC_ ont également fait leur apparition dans le logiciel de montage vidéo non-linéaire [_Flowblade_](https://github.com/jliljebl/flowblade), grâce au travail acharné de [_Janne Liljeblad_](https://plus.google.com/u/0/b/117441237982283011318/102624418925189345577/posts) son programmeur principal (voir figure ci-dessous). Là encore, le but est de permettre d'appliquer des effets _G'MIC_ sur des séquences d'images dans un but essentiellement artistique, comme le montre [cette vidéo](https://vimeo.com/157364651), ou encore [celle-ci](https://vimeo.com/164331676).


![img](https://tschumperle.users.greyc.fr/lfr3/gmic_flowblade.jpg)
_Fig.3.5. Aperçu d'un filtre G'MIC tournant sous Flowblade, éditeur non-linéaire de vidéos._


- Notons également que de plus en plus de ressources extérieures faisant mention de _G'MIC_ font leur apparition sur la toile : des tutoriaux et des articles de blog ([ici](https://discuss.pixls.us/t/fourier-transform-for-fixing-regular-pattern-noise/586), [ici](https://paulsphotopalace.wordpress.com/the-color-mixers-3/
), [ici](http://lapizybits.blogspot.com/2015/12/efecto-esbozo.html)…), ou encore des vidéos de démonstrations ([ici](https://www.youtube.com/watch?v=YjqMT7Mn2ac), [ici](https://www.youtube.com/watch?v=VPG1dkPlyvo), [ici](https://www.youtube.com/watch?v=N3KqWTmkgB8), [ici](https://www.youtube.com/watch?v=w6Sr1nO5gFo)…). C'est très positif pour la visibilité du projet, et en même temps cela fait vraiment plaisir à voir. Merci donc à tout ces gens qui prennent le temps d'en parler de manière bénévole et désintéressée !


# 4. Comment tout cela va évoluer ?


Quelques petites observations :


- Comme vous pouvez le constater, le développement du projet _G'MIC_ se poursuit à un rythme soutenu. Ses fonctionnalités semblent intéresser de plus en plus d'utilisateurs (ce que confirme les statistiques de visites/téléchargements du site web), mais aussi de plus en plus de développeurs : aujourd'hui, on retrouve des intégrations ou des greffons (plus ou moins aboutis) basés sur _G'MIC_ dans des logiciels libres aussi divers que [_GIMP_](http://www.gimp.org), [_Krita_](https://krita.org/), [_Blender_](https://www.blender.org/), [_Photoflow_](https://aferrero2707.github.io/PhotoFlow/), [_Flowblade_](https://github.com/jliljebl/flowblade), [Veejay](http://veejayhq.net/), [_EKD_](http://ekd.tuxfamily.org/) et dans un futur proche (du moins on l'espère) [_Natron_](http://natron.fr/).
- L'un ne va probablement pas sans l'autre : le fait d'avoir des utilisateurs nous encourage à ajouter de nouvelles fonctionnalités régulièrement, ce qui attire aussi de nouveaux utilisateurs. Tant que ça fonctionne de cette façon, on essayera de continuer ! Car notons tout de même que tout ceci demande pas mal de temps (pour ma part, entre _10_ et _15_ heures par semaine _en dehors_ de mes heures officielles de travail).
- Tout ça pour redire un grand merci aux utilisateurs et aux contributeurs (toujours plus nombreux), aux curieux et à ceux qui font de la publicité au projet directement ou indirectement. Ça aide énormément !


En réalité, on ne sait pas encore comment le projet _G'MIC_ va évoluer dans le futur, mais il y a déjà tellement de choses à faire dans le présent qu'on se concentre dessus pour le moment. On vous donne peut-être rendez vous dans quelques mois pour la suite des aventures de _G'MIC_. On vous invite également à rejoindre la communauté présente sur notre forum officiel sur [pixls.us](https://discuss.pixls.us/c/software/gmic) pour obtenir plus de renseignements et répondre à vos questions sur le projet. Et surtout, en attendant, n'hésitez pas à vous mettre au traitement d'images __libre__ !
