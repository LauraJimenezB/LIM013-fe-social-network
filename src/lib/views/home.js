import { createPost, post } from '../controllers/home-controller.js';

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
    <span id="username"></span>
  </aside>
  <div class="posts">
  <section class="homeEditor">
    <textarea id="textValue" class="textArea" placeholder="Escribe aquí tus opiniones"></textarea>
    <div class="postButtons">
    <button>Add Image</button>
    <button id="send">Send</button>
    </div>
  </section>
  <section class='postArea' id='publicPost'>
    <!--Area de publicaciones-->
  </section>
  </div>
</div>
</div>
`;

  const divElement = document.createElement('div');
  divElement.innerHTML = homeView;
  // Obteniendo el valor del textarea
  let textValue = divElement.querySelector('#textValue');
  // Subiendo el valor a firestore
  const sendButton = divElement.querySelector('#send');

  let editStatus = false;
  let id = '';
  const updatePost = (id, updatedText) => {
    db().collection('posts').doc(id).update(updatedText);
  };

  sendButton.addEventListener('click', () => {
    if (!editStatus) {
      post(textValue.value);
    } else {
      updatePost (id, {
        text: textValue.value,
      });
    }
    textValue.value = '';
    editStatus = false;
    sendButton.innerText = 'Send';
  });

  // PROFILE
  const user = firebase.auth().currentUser;

  if (user) {
    console.log('user is signed');
    const docRef = db().collection('users').doc(user.uid);
    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log('Document data:', doc.data());
        const username = divElement.querySelector('#username');
        username.innerHTML = doc.data().name;
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
  }
  // POSTS
  const postArea = divElement.querySelector('#publicPost');

  function showPosts(doc) {
    const divPost = document.createElement('div');
    divPost.classList.add('divPost');

    const postTemplate = `
  
    <div class="postUserInformation">
      <span>Username</span>
      <span>Fecha</span>
    </div>
    <div class="editDeletePrivacy">
      <button id='edit'>Editar</button>
      <button id='delete'>Eliminar</button>
      <button>Privado/pública</button>
    </div>
    <div id='editArea' style='display: none'>
      <textarea id="textEdit" class="textArea" placeholder="Escribe aquí tus opiniones"></textarea>
      <div class="buttonsEdit">
        <button id="sendEdit">Editar</button>
    </div>
    </div>
    <div id="contentPost" class="contentPost"></div>
    <button id="likeButton"><span id="like" class="iconify" data-icon="ant-design:like-twotone" data-inline="false"></span> Like</button>
    <div id="comment">
    </div>
  
`;

    divPost.innerHTML = postTemplate;
    const content = divPost.querySelector('#contentPost');
    content.textContent = doc.data().text;
    divPost.setAttribute('data-id', doc.id);
    postArea.appendChild(divPost);

    // DELETE
    const deletePost = divPost.querySelector('#delete');
    deletePost.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = e.target.parentElement.parentElement.getAttribute('data-id');
      db().collection('posts').doc(id).delete();
    });

    // EDIT
    const editPost = divPost.querySelector('#edit');
    /*
    const editArea = divPost.querySelector('#editArea');
    const editText = divPost.querySelector('#textEdit');
    const sendEdit = divPost.querySelector('#sendEdit');
    */
    editPost.addEventListener('click', (e) => {
      e.stopPropagation();
      // editArea.style.display = 'block';
      editStatus = true;
      sendButton.innerText = 'Update';
      console.log(editStatus);
      id = e.target.parentElement.parentElement.getAttribute('data-id');
      const getPost = doc.data();
      textValue.value = getPost.text;
    });
  }

  createPost(showPosts);
  window.addEventListener('DOMContentLoaded', () => {
    showPosts();
  });

  return divElement;
};
