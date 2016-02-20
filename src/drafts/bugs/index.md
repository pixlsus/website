---
date: 2016-02-12T10:26:41-06:00
title: ""
author: "Pat David"
template: article.hbt
nodiscuss: true

---

## Lending a Hand

On the [RawTherapee][] [New Windows builds][seb] thread over in [the forums][] Sebastian Guyader makes a nice point for RawTherapee users about helping out through testing the builds.  Most of the _maintainers_ of free software are not using a proprietary operating system like Windows, while I feel many _users_ of photography-oriented free software might be (I am one of those who finds themselves constrained to using Windows during the day).

[RawTherapee]: https://discuss.pixls.us/c/software/rawtherapee
[seb]: https://discuss.pixls.us/t/new-windows-builds/615/84
[the forums]: https://discuss.pixls.us

This makes it hard(_er_) to test for bugs on that platform (and is something that should be kept in mind when you run into a problem).

To quote [Sebastians post][seb]:

<style>
blockquote {
    font-size: 0.9rem;
    color: #888;
}
blockquote p {
    color: #888;
    font-style: normal;
}
</style>
> ...you should be aware that developers, and us packagers, also have limited time. We all do this on our free time, and the *development* builds you've tried are just that... **development** builds. We have recently started to package a debugger (gdb.exe) within the Debug builds, so that producing useful bug reports isn't as difficult as before. It's not that complicated, if you really want to help the community just spend 5 minutes reading the following, and 10 minutes doing this:
> 
> * download and install the Debug build corresponding to the version which crashes
> * run `cmd`
> * change directory (`cd`) to the RT install folder
> * type `gdb rawtherapee.exe`
> * at the (gdb) prompt type `run`
> * do whatever can cause a crash on RT
> * upon crash, alt+tab to the comand prompt and type `bt full`
> * copy the message related to error encountered by RT
> * open a new issue on github, and paste the error message from GDB there
> 
> All of these stps are detailed in the [online documentation](http://50.87.144.65/~rt/w/index.php?title=How_to_write_useful_bug_reports).
> 
> Windows builds get tested by some of the developers, but they legitimately focus on working on already known/reported bugs, new features, code cleanup, etc... and they can't test every other aspect of the software. In my opinion, **developers** should concentrate on **developing** the software and not testing, while **testing** should be done by volunteering **testers**, who are asked to provide useful bug reports to improve the stability of the program.

I think this is worth keeping in mind.  I know that many folks feel that if they're unable to code, or lack funds, that they cannot contribute - _but this isn't true_.  There are many ways to help the community!




