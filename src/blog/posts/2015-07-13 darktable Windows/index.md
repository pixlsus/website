---
date: 2015-07-13T16:54:23-05:00

title: "darktable on Windows"
sub-title: "Why don't you provide a Windows build?"

canonical: "http://www.darktable.org/2015/07/why-dont-you-provide-a-windows-build/"

lede-img: "three-windows.jpg"
lede-style: "background-size: cover; background-repeat: no-repeat;"
lede-attribution: "<a href='https://www.flickr.com/photos/erwin_soo/8082049116/'>The 3 Windows - A study of contrasts</a> by <a href='https://www.flickr.com/photos/erwin_soo/'>Erwin Soo</a> <a class='cc' href='https://creativecommons.org/licenses/by/2.0/' target='_blank'>cb</a>"
lede-img-thumb: "th_three-windows.jpg"

author: "The darktable Team" #required
author-img: "/images/authors/darktable.png"
author-url: "http://www.darktable.org"
author-twitter: ""
author-gplus: ""
author-fb: ""
author-bio: "This post was originally published on the <a href='http://www.darktable.org/2015/07/why-dont-you-provide-a-windows-build/'>darktable blog</a>.<br/>It is republished here with permission. (<a class='cc' href='http://creativecommons.org/licenses/by-nc-sa/3.0/' target='_blank'>cbna</a>)"

collection: blogposts 
template: blog-posts.hbt
---

Due to the heated debate lately, a short foreword:

We do not want to harass, insult or criticize anyone due to his or her choice of operating system. Still, from time to time we encounter comments from people accusing us of ignorance or even disrespect towards Windows users. If any of our statements can be interpreted such, we want to apologize for that – and once more give the full explanation of our lacking Windows support.

## The darktable project

darktable is developed and maintained by a small group of people in their spare time, just for fun. We do not have any funds, do not provide travel reimbursements for conferences or meetings, and don't even have a legal entity at the moment. In other words: None of the developers has ever seen (and most likely will ever see) a single $(INSERT YOUR CURRENCY) for the development of darktable, which is thus a project purely driven by enthusiasm and curiosity.

<!-- more -->

## The development environment

The team is quite mixed, some have a professional background in computing, others don't. But all love photography and like exploring the full information recorded by the camera themselves. Most new features are added to darktable as an expert for, let's say GPU computing, steps up and is willing to provide and maintain code for the new feature.

Up till now there is one technical thing that unites all developers: None of them is using Windows as operating system. Some are using Mac OSX, Solaris, etc, but most run some Linux distribution. New flavors of operating systems kept being added to our list with people willing to support their favorite system joining the team.

Also (since this stands out a bit as “commercial operating system”) Mac OS X support arrived in exactly this way. Someone (parafin!) popped up, said: “I like this software, and I want to run darktable on my Mac.”, compiled it on OS X and since then does testing and package building for the Mac OS X operating system. And this is not an easy job. Initially there were just snapshot builds from git, no official releases, not even release candidates – but already the first complaints about the quality arrived. Finally, there was a lot of time invested in working around specific peculiarities of this operating system to make it work and provide builds for every new version of darktable released.

This nicely shows one of the consequences of the project's organizational (non-) structure and development approach: at first, every developer cares about darktable running on his personal system.

## Code contributions and feature requests

Usually feature requests from users or from the community are treated like a brainstorming session. Someone proposes a new feature, people think and discuss about it – and if someone likes the idea and has time to code it, it might eventually come – if the team agrees on including the feature.

But life is not a picnic. You probably wouldn't pass by your neighbor and demand from him to repair your broken car – just because you know he loves to tinker with his vintage car collection at home.  
 Same applies here. No one feels comfortable if suddenly request are being made that would require a non-negligible amount of work – but with no return for the person carrying out the work, neither moneywise nor intellectually.

This is the feeling created every time someone just passes by leaving as only statement: “Why isn't there a Windows build (yet)?”.

## Providing a Windows build for darktable

The answer has always been the same: because no one stepped up doing it. None of the passers-by requesting a Windows build actually took the initiative, just downloaded the source code and started the compilation. No one approached the development team with actual build errors and problems encountered during a compilation using MinGW or else on Windows. The only thing ever aired were requests for ready-made binaries.

As stated earlier here, the development of darktable is totally about one's own initiative. This project (as many others) is not about ordering things and getting them delivered. It's about starting things, participating and contributing. It's about trying things out yourself. It's FLOSS.

One argument that pops up from time to time is: “darktable's user base would grow immensely with a Windows build!”. This might be true. But – what's the benefit from this? Why should a developer care how many people are using the software if his or her sole motivation was producing a nice software that he/she could process raw files with?

On the contrary: more users usually means more support, more bug tracker tickets, more work. And this work usually isn't the pleasing sort, hunting seldom bugs occurring with some rare camera's files on some other operating system is usually not exactly what people love to spent their Saturday afternoon on.

This argumentation would totally make sense if darktable would be sold, the developers paid and the overall profit would depend on the number of people using the software. No one can be blamed for sending such requests to a company selling their software or service (for your money or your data, whatever) – and it is up to them to make an economical decision on whether it makes sense to invest the time and manpower or not.

But this is different.

Not building darktable on Windows is not a technical issue after all. There certainly are problems of portability, and code changes would be necessary, but in the end it would probably work out. The real problem is (as has been pointed out by the darktable development team many times in the past) the maintenance of the build as well as all the dependencies that the package requires.

The darktable team is trying to deliver a high-quality reliable software. Photographers rely on being able to re-process their old developments with recent versions of darktable obtaining exactly the same result – and that on many platforms, being it CPUs or GPUs with OpenCL. Satisfying this objective requires quite some testing, thinking and maintenance work.

Spawning another build on a platform that not a single developer is using would mean lots and lots of testing – in unfamiliar terrain, and with no fun attached at all. Releasing a half-way working, barely tested build for Windows would harm the project's reputation and diminish the confidence in the software treating your photographs carefully.

We hope that this reasoning is comprehensible and that no one feels disrespected due to the choice of operating system.

# References

[That other OS](http://www.darktable.org/2011/07/that-other-os/)

