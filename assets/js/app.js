
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

  // Create new fragment to build our discuss list in
  var discuss_fragment = new DocumentFragment();

  json.topic_list.topics.forEach((topic)=> {
    //console.log(`${topic.fancy_title}`);

    // Setup dom objects to contain the post info
    const a = document.createElement('article');
    const h = document.createElement('h5');
    const link = document.createElement('a');
    const users = document.createElement('div');
    const post_info = document.createElement('div');

    a.classList.add('pb-2');
    a.classList.add('pt-2');

    users.classList.add('users-list');
    users.classList.add('mb-1');

    link.innerHTML = topic.fancy_title;
    link.href = `https://discuss.pixls.us/t/${topic.slug}/${topic.id}`;

    const views = document.createElement('div');
    views.innerHTML = `<small title='${topic.views} views' class='post-stats'><img src='/images/svg/eye.svg'> ${topic.views}</small>`;
    views.innerHTML = views.innerHTML + ` <small title='${topic.posts_count} posts' class='post-stats ms-2'><img src='/images/svg/chat-left-text.svg'> ${topic.posts_count}</small>`;

    // Find a user object based on id
    for( u of topic.posters ){
      var user = json.users.find( function( user, idx ){
        if ( user.id == u.user_id )
          return true;
      });
      var user_link = document.createElement('a');
      var img = document.createElement('img');
      var imgsrc = user.avatar_template.replace("{size}", "20");

      img.src = '/images/logo/small-avatar.png';
      img.src = `https://discuss.pixls.us/${imgsrc}`;
      //img.style.backgroundColor = "grey";
      img.classList.add('me-1');

      user_link.href = `https://discuss.pixls.us/u/${user.username}`;
      user_link.title = `${user.username} - ${u.description}`;

      user_link.appendChild( img );
      users.appendChild( user_link );
    }

    h.appendChild( link );
    a.appendChild( h );
    a.appendChild( users );
    a.appendChild( views );
    discuss_fragment.appendChild( a );
  });

  // Add discuss list to discuss column
  ts.appendChild( discuss_fragment );
}


var host = window.location.hostname == 'localhost' ? 'http://localhost:1313' : 'https://discuss.pixls.us';

/* Testing fetch API */
//fetch('http://time.jsontest.com')
//fetch('https://discuss.pixls.us/latest.json', { mode: 'no-cors',})
fetch( host + '/latest.json')
  .then( response => {
        if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
              }
        return response.json();
      })
  .then( json => add_discuss_homepage(json) )
  .catch( err => console.error(`Fetch problem: ${err.message}`) );

