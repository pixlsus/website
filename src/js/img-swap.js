/*
 * Simple image swapping using html5 data-* attributes.
 * Get all images with the 'data-swap-src' attribute.
 * For each image, set the 'data-swap' attribute to a start value
 * Add event listener to the images to trigger swap function
 * swap function swaps out the current src and data-swap values
 */
var imgs = document.querySelectorAll('[data-swap-src]');

var images_pre = new Array();

for ( var i = 0; i < imgs.length; i++ ){
	imgs[i].setAttribute('data-swap', imgs[i].getAttribute('data-swap-src') );
	imgs[i].addEventListener('click', swap, false);
	imgs[i].style.cursor = "crosshair";
    images_pre[i] = new Image();
    images_pre[i].src = imgs[i].getAttribute('data-swap-src');
}

function swap(evt){
	var et = evt.target;
	var tmp = et.src;
	et.src = et.getAttribute('data-swap');
	et.setAttribute('data-swap', tmp);
	et.style.cursor == "crosshair" ? et.style.cursor = "w-resize" : et.style.cursor = "crosshair";
}

var figswap = document.querySelectorAll('[data-fig-swap]');

    //et.parentNode.parentNode.getElementsByTagName('img')[0].src = et.getAttribute('data-fig-swap');

function swapfig(evt){
    var et = evt.target;
    et.parentNode.parentNode.getElementsByTagName('img')[0].src = et.getAttribute('data-fig-swap');
}

var images_pre = new Array();

for ( var i = 0; i< figswap.length; i++ ){
    images_pre[i] = new Image();
    images_pre[i].src = figswap[i].getAttribute('data-fig-swap');
    figswap[i].addEventListener('click', swapfig, false);
}

