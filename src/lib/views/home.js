import {
  createPost, myownPosts, deletePosts, profile, uploadPost, profilePost,
} from '../controllers/home-controller.js';
import { logOut } from '../firebase/auth.js';

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
        <li id='logIn'><a href="#/signIn">INICIAR SESIÓN</a></li>
        <li id='signUp'><a href="#/signUp">REGISTRARSE</a></li>
        <li id='myPosts'>MIS POSTS</li>
        <li id='logOut'>SALIR</li>
      </ul>
    </nav>
</header>
<div class="main">
  <aside class="homeProfile">
    <img width="100px" height="100px" id='myPhoto'>
    <figcaption></figcaption>
    <span id="username"></span>
    <button id="editPhoto">Editar foto</button>
  </aside>
  <div class="posts">
  <section class="homeEditor">
    <textarea id="textValue" class="textArea" placeholder="Escribe aquí tus opiniones"></textarea>
    <div class="postButtons">
    <input type="file" id="imageFile">
    <button id="send">Send</button>
    <label for="status">Status:</label>
    <select id="status" name="status">
      <option value="privado">Privado</option>
      <option value="publico">Público</option>
    </select>
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
  const textValue = divElement.querySelector('#textValue');
  const statusValue = divElement.querySelector('#status');
  const sendButton = divElement.querySelector('#send');

  let editStatus = false;
  let id = '';

  /*   SUBIR IMAGENES */
  const imageButton = divElement.querySelector('#imageFile');
  let file;
  imageButton.addEventListener('change', (e) => {
    file = e.target.files[0];
  });
  sendButton.addEventListener('click', () => {
    uploadPost(file, editStatus, textValue, statusValue, id);
    textValue.value = '';
    editStatus = false;
    sendButton.innerText = 'Send';
  });

  // Log Out
  const logIn = divElement.querySelector('#logIn');
  const signUp = divElement.querySelector('#signUp');
  const myPosts = divElement.querySelector('#myPosts');
  const username = divElement.querySelector('#username');
  const myPhoto = divElement.querySelector('#myPhoto');

  const logOutButton = divElement.querySelector('#logOut');
  logOutButton.addEventListener('click', (e) => {
    e.preventDefault();
    logOut();
    logIn.style.display = 'inline-block';
    signUp.style.display = 'inline-block';
    logOutButton.style.display = 'none';
    myPosts.style.display = 'none';
    username.innerHTML = 'User is not signed';
    myPhoto.src = '../img/userPhoto.svg';
  });

  // PROFILE
  const user = firebase.auth().currentUser;
  if (user) {
    logIn.style.display = 'none';
    signUp.style.display = 'none';
    profile(divElement, user.uid, username, myPhoto);
  } else {
    logOutButton.style.display = 'none';
    myPosts.style.display = 'none';
    username.innerHTML = 'User is not signed';
    myPhoto.src = '../img/userPhoto.svg';
  }

  // POSTS
  const postArea = divElement.querySelector('#publicPost');
  function showPosts(doc) {
    const divPost = document.createElement('div');
    divPost.classList.add('divPost');

    const postTemplate = `
  
    <div class="postUserInformation">
      <img id='userPhoto' height='50px' width='50px'>
      <span id='usernamePost'></span>
      <span id='statusPost'></span>
    </div>
    <div id='editArea' style='display: none'>
      <textarea id="textEdit" class="textArea" placeholder="Escribe aquí tus opiniones"></textarea>
      <div class="buttonsEdit">
        <button id="sendEdit">Editar</button>
    </div>
    </div>
    <div id="contentPost" class="contentPost"></div>
    <div id='images'>
    <img id='img' height='150px' width='150px'>
    </div>
    <div class="editDeletePrivacy">
    <button id='edit'>Editar</button>
    <button id='delete'>Eliminar</button>
  </div>
    <button id="likeButton"><span id="like" class="iconify" data-icon="ant-design:like-twotone" data-inline="false"></span> Like</button>
    <div id="comment">
    </div>
  
`;
    divPost.innerHTML = postTemplate;
    const content = divPost.querySelector('#contentPost');
    const selectedImg = divPost.querySelector('#img');
    divPost.setAttribute('data-id', doc.id);
    postArea.appendChild(divPost);

    // POST CONTENT
    content.textContent = doc.data().text;
    if (doc.data().photo === 'photo') {
      selectedImg.style.display = 'none';
    } else {
      selectedImg.src = doc.data().photo;
    }

    const usernamePost = divPost.querySelector('#usernamePost');
    const userphotoPost = divPost.querySelector('#userPhoto');
    const statusPost = divPost.querySelector('#statusPost');
    statusPost.innerHTML = doc.data().status;
    const uidPost = doc.data().uid;
    usernamePost.textContent = uidPost;
    // POST USER INFO
    profilePost(uidPost, usernamePost, userphotoPost);

    // DELETE
    const deletePost = divPost.querySelector('#delete');
    deletePost.addEventListener('click', (e) => {
      e.stopPropagation();
      const idPost = e.target.parentElement.parentElement.getAttribute('data-id');
      deletePosts(idPost);
    });

    // EDIT
    const editPost = divPost.querySelector('#edit');
    editPost.addEventListener('click', (e) => {
      e.stopPropagation();
      editStatus = true;
      sendButton.innerText = 'Update';
      id = e.target.parentElement.parentElement.getAttribute('data-id');
      const getPost = doc.data();
      textValue.value = getPost.text;
      statusValue.value = getPost.status;
    });
  }
  const postsArea = divElement.querySelector('#publicPost');
  createPost(showPosts, postsArea);

  // MY POSTS SECTION
  myPosts.addEventListener('click', (e) => {
    e.stopPropagation();
    Array.from(divElement.querySelectorAll('.divPost'))
      .forEach((div) => {
        // eslint-disable-next-line no-param-reassign
        div.style.display = 'none';
      });
    myownPosts(showPosts, postArea, user.uid);
  });

  return divElement;
};
