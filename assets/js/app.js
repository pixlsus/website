
/* JS to mod homepage articles/blogs/discuss headings
 * on scroll top.
 */

var latest_headings = document.getElementsByClassName('latest-heading');
var nav = document.getElementsByTagName('nav')[0];

let options = {
  root: document,
  rootMargin: "0px",
  threshold: [0.05]
}

let report = (entries) => {
  //console.log( 'lede-hero did something...');
  entries.forEach(entry => {
    //console.log( entry.isIntersecting );
    if( entry.isIntersecting ){
      nav.classList.remove('bg-dark');
      for(let lhead of latest_headings){
        lhead.getElementsByTagName('h2')[0].style.display = 'block';
        lhead.children[0].style.height = '80px';
        lhead.children[0].classList.remove('me-2');
        lhead.classList.remove('border-bottom');
      }
    }else{
      nav.classList.add('bg-dark');
      for(let lhead of latest_headings){
        lhead.getElementsByTagName('h2')[0].style.display = 'inline';
        lhead.children[0].style.height = '30px';
        lhead.children[0].classList.add('me-2');
        lhead.classList.add('border-bottom');
      }
    }
  });
}

let observer = new IntersectionObserver( report, options );
observer.observe( document.getElementById('lede-hero') );

function add_discuss_homepage( json ){
  console.log( json );
  var ts = document.getElementById('discuss-col');

  json.topic_list.topics.forEach((topic)=> {
    //console.log(`${topic.fancy_title}`);
    const h = document.createElement('h4');
    const a = document.createElement('article');
    h.innerText = topic.fancy_title;

    a.appendChild( h );
    ts.appendChild( a );
  });
}

/* Testing fetch API */
//fetch('http://time.jsontest.com')
//fetch('https://discuss.pixls.us/latest.json', { mode: 'no-cors',})
fetch('http://localhost:1313/latest.json')
  .then( response => {
        if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
              }
        return response.json();
      })
  .then( json => add_discuss_homepage(json) )
  .catch( err => console.error(`Fetch problem: ${err.message}`) );

