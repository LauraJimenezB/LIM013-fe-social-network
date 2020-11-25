import { post } from '../controllers/home-controller.js';
import { signInGoogle } from '../firebase/auth.js';

const firestore = () => firebase.firestore();
const db = firestore;

export const home = () => {
  const homeView = `<div class="homeContainer">
<header class="homeHeader">
    <nav>
      <input type="checkbox" id="check">
      <label for="check" class="checkbtn">
        <i class="fas fa-bars"><img src='../img/vectorpaint.svg' width='40px' height='40px'></i>
      </label>
      <label class="logo">Street Food</label>
      <ul>
        <li><a class="active" href="#">Home</a></li>
        <li><a href="#/signIn">Log In</a></li>
        <li><a href="#/signUp">Sign Up</a></li>
      </ul>
    </nav>
</header>
<div class="main">
  <aside class="homeProfile">
    <figure>
      <img src="https://cdn.icon-icons.com/icons2/1674/PNG/512/person_110935.png" width="100px" height="100px">
    </figure>
    <figcaption>Username</figcaption>
  </aside>
  <div class="posts">
  <section class="homeEditor">
    <textarea id="textValue" class="textArea" placeholder="Escribe aquí tus opiniones"></textarea>
    <div class="postButtons">
    <button>Add Image</button>
    <button id="send">Send</button>
    </div>
  </section>
  <section id='publicPost'>
    <!--Area de publicaciones-->
  </section>
  </div>
</div>
</div>
`;

  const divElement = document.createElement('div');
  divElement.innerHTML = homeView;
  // Obteniendo el valor del textarea
  const textValue = divElement.querySelector('#textValue');
  // Subiendo el valor a firestore
  const sendButton = divElement.querySelector('#send');
  sendButton.addEventListener('click', () => {
    post(textValue.value);
  });
  const postArea = divElement.querySelector('#publicPost');
  const postTemplate = `
  <div>
    <span>Username</span>
    <span>Fecha</span>
  </div>
  <div>
    <button>Editar</button>
    <button>Eliminar</button>
    <button>Privado/pública</button>
  </div>
  <div id="contentPost"></div>
  <button>Like</button>
  <div id="comment">
  </div>
`;
  // PROFILE
  const user = firebase.auth().currentUser;
  /*
  if (user.isAnonymous === false) {
    const docRef = db().collection('users').doc('7VeaZPrqUnPbWLEGxJ9mmbZUv7Y2');
  }
  */
  const docRef = db().collection('users').doc(user.uid);
  docRef.get().then((doc) => {
    if (doc.exists) {
      console.log('Document data:', doc.data());
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  }).catch((error) => {
    console.log('Error getting document:', error);
  });

  // POSTS
  function showPosts(doc) {
    const divPost = document.createElement('div');
    divPost.classList.add('divPost');
    divPost.innerHTML = postTemplate;
    /*
    const content = divElement.querySelector('#contentPost');
    content.textContent = doc.data().text;
    */
    const contentPost = document.createElement('span');

    divElement.setAttribute('data-id', doc.uid);
    contentPost.textContent = doc.data().text;
    divPost.appendChild(contentPost);
    postArea.appendChild(divPost);
  }
  db().collection('posts').get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => { showPosts(doc); });
    })
    .catch((e) => console.log('error', e));
  return divElement;
};
/*
const postsTemplate = () => {
  const newPost = document.createElement('div');
  newPost.innerHTML = `

  `;
};
*/
