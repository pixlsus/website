/*
 * This is to handle the auto-hiding nav bar when scrolling
 * Relies on the id of the navbar to be "bar"
 */

var didScroll = false;
var navbar = document.getElementById('bar');
var navHeight = navbar.offsetHeight;
var delta = 10;
var lastScrollTop = 0;

window.onscroll = doScroll;

function doScroll(){
    /*
    if( window.innerWidth >= 1024 ){
    }else{
        didScroll = true;
    }
    */
    if( window.innerWidth < 1024) didScroll = true;
}

setInterval( function() {
    if( didScroll ) {
        didScroll = false;
        var st = window.pageYOffset;

        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        // If scroll past navbar, add class .nav-up
        if ( st > lastScrollTop ){
            //scroll down
            navbar.className = navbar.className.replace('nav-down','nav-up');
			//b.backgroundPositionY = parseInt( b.backgroundPositionY ) + 4 + '%';
        }else{
            //scroll up?
            navbar.className = navbar.className.replace('nav-up','nav-down');
			//b.backgroundPositionY = parseInt( b.backgroundPositionY ) - 4 + '%';
        }
        lastScrollTop = st;
    }
}, 250);





