var trackLocation = function(e){
    var position = ((e.pageX - this.getBoundingClientRect().left)/this.offsetWidth)*100;
    console.log( position );
    if( position <= 100 ){ this.lastElementChild.style.width = position+"%"; }
}
