import { createPost, post, myownPosts, deletePosts } from '../controllers/home-controller.js';

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
        <li id='logIn'><a href="#/signIn">INICIAR SESIÓN</a></li>
        <li id='signUp'><a href="#/signUp">REGISTRARSE</a></li>
        <li id='myPosts'>MIS POSTS</li>
        <li id='logOut'>SALIR</li>
      </ul>
    </nav>
</header>
<div class="main">
  <aside class="homeProfile">
    <figure>
      <img src='../img/user.svg' width="100px" height="100px" class='imgUser'>
    </figure>
    <figcaption></figcaption>
    <span id="username"></span>
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
  // Obteniendo el valor del textarea
  const textValue = divElement.querySelector('#textValue');
  // Obteniendo el valor de privacidad
  const statusValue = divElement.querySelector('#status');
  // Subiendo el valor a firestore
  const sendButton = divElement.querySelector('#send');

  let editStatus = false;
  let id = '';
  const updatePost = (idPost, updatedText) => {
    db().collection('posts').doc(id).update(updatedText);
  };
  /*   SUBIR IMAGENES */
  const imageButton = divElement.querySelector('#imageFile');
  let file;
  imageButton.addEventListener('change', (e) => {
    file = e.target.files[0];
  });
  sendButton.addEventListener('click', () => {
    const user = firebase.auth().currentUser;
    if (user && file) {
      const fileRef = firebase.storage().ref(`users/${user.uid}/${file.name}`);
      const uploadTask = fileRef.put(file);
      const text = textValue.value;
      uploadTask.then(() => {
        console.log(textValue.value);
        console.log('Succesfully uploaded');
        return fileRef.getDownloadURL().then((url) => {
          console.log('URL', url);
          console.log(text);
          if (!editStatus) {
            post(text, statusValue.value, url);
          } else {
            updatePost(id, {
              text: textValue.value,
            });
          }
        });
      });
    } else if (user && file === undefined) {
      if (!editStatus) {
        post(textValue.value, statusValue.value, 'photo');
      } else {
        updatePost(id, {
          text: textValue.value,
        });
      }
    }
    textValue.value = '';
    editStatus = false;
    sendButton.innerText = 'Send';
  });
  // Log Out
  const logIn = divElement.querySelector('#logIn');
  const signUp = divElement.querySelector('#signUp');
  const myPosts = divElement.querySelector('#myPosts');
  const username = divElement.querySelector('#username');

  const logOut = divElement.querySelector('#logOut');
  logOut.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut().then(() => {
      console.log('user signed out');
      logIn.style.display = 'inline-block';
      signUp.style.display = 'inline-block';
      logOut.style.display = 'none';
      myPosts.style.display = 'none';
      username.innerHTML = 'User is not signed';
    });
  });

  // PROFILE
  const user = firebase.auth().currentUser;
  if (user) {
    console.log('user is signed');
    db().collection('users').doc(user.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          // console.log('Document data:', doc.data());
          username.innerHTML = `USERNAME: ${doc.data().name}`;
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      });
    logIn.style.display = 'none';
    signUp.style.display = 'none';
  } else {
    logOut.style.display = 'none';
    myPosts.style.display = 'none';
    username.innerHTML = 'User is not signed';
  }
  // POSTS
  const postArea = divElement.querySelector('#publicPost');
  function showPosts(doc) {
    const divPost = document.createElement('div');
    divPost.classList.add('divPost');

    const postTemplate = `
  
    <div class="postUserInformation">
      <span id='usernamePost'></span>
      <span>Fecha</span>
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
    content.textContent = doc.data().text;
    divPost.setAttribute('data-id', doc.id);
    postArea.appendChild(divPost);

    if (doc.data().photo === 'photo') {
      selectedImg.style.display = 'none';
    } else {
      selectedImg.src = doc.data().photo;
    }

    const usernamePost = divPost.querySelector('#usernamePost');
    const uidPost = doc.data().uid;
    usernamePost.textContent = uidPost;
    db().collection('users').doc(uidPost)
      .onSnapshot((file) => {
        usernamePost.innerHTML = file.data().name;
      });

    // DELETE
    const deletePost = divPost.querySelector('#delete');
    deletePost.addEventListener('click', (e) => {
      deletePosts(e);
    });

    // EDIT
    const editPost = divPost.querySelector('#edit');
    editPost.addEventListener('click', (e) => {
      e.stopPropagation();
      // editArea.style.display = 'block';
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

  myPosts.addEventListener('click', (e) => {
    e.stopPropagation();
    // const postDiv = divElement.querySelectorAll('.divPost');
    Array.from(divElement.querySelectorAll('.divPost'))
      .forEach((each) => {
        // eslint-disable-next-line no-param-reassign
        each.style.display = 'none';
      });
    // for (let x = 0; x < postDiv.length; x++) { postDiv[x].style.display = 'none'; }
    myownPosts(showPosts, postArea, user.uid);
  });
  return divElement;
};
