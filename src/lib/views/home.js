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
        <li id='logOut'>Log Out</li>
        <li id='myPosts'>My posts</li>
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
  imageButton.addEventListener('change', (e) => {
    const file = e.target.files[0];
    console.log(file);
    const user = firebase.auth().currentUser;
    if (user) {
      firebase.storage().ref(`users/${user.uid}/post.jpg`).put(e.target.files[0])
        .then((res) => console.log(res, 'Succesfully uploaded'))
        .catch((error) => console.log(error));
    }
  });
  sendButton.addEventListener('click', () => {
    if (!editStatus) {
      post(textValue.value, statusValue.value);
    } else {
      updatePost(id, {
        text: textValue.value,
      });
    }
    textValue.value = '';
    editStatus = false;
    sendButton.innerText = 'Send';
  });
  // Log Out
  const logOut = divElement.querySelector('#logOut');
  logOut.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut().then(() => {
      console.log('user signed out');
    });
  });

  // PROFILE
  const user = firebase.auth().currentUser;

  if (user) {
    console.log('user is signed');
    const docRef = db().collection('users').doc(user.uid);
    docRef.get().then((doc) => {
      if (doc.exists) {
        // console.log('Document data:', doc.data());
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
      <span id='usernamePost'></span>
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

    const usernamePost = divPost.querySelector('#usernamePost');
    const uidPost = doc.data().uid;
    usernamePost.textContent = uidPost;
    db().collection('users').doc(uidPost)
      .onSnapshot((doc) => {
        usernamePost.innerHTML = doc.data().name;
      });

    // DELETE
    const deletePost = divPost.querySelector('#delete');
    deletePost.addEventListener('click', (e) => {
      e.stopPropagation();
      const idPost = e.target.parentElement.parentElement.getAttribute('data-id');
      db().collection('posts').doc(idPost).delete();
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
    });

    const myPosts = divElement.querySelector('#myPosts');
    myPosts.addEventListener('click', () => {
      Array.from(divElement.querySelectorAll('.divPost'))
        .forEach((postDiv) => {
          postDiv.style.display = 'none';
        });
      // for (let x = 0; x < postDiv.length; x++) { postDiv[x].style.display = 'none'; }
      // postDiv.style.display = 'none';
      db().collection('posts').where('status', '==', 'privado')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc);
            // doc.data() is never undefined for query doc snapshots
            showPosts(doc);
            console.log(doc.id, ' => ', doc.data());
          });
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
        });
    });
  }

  const postA = divElement.querySelector('#publicPost');
  createPost(showPosts, postA);
  return divElement;
};
