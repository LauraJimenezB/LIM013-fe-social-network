/* eslint-disable no-param-reassign */
import { savePosts } from '../firebase/firestore.js';

const firestore = () => firebase.firestore();
const db = firestore;

// CREATE POST
export const createPost = (showPosts, containerPost) => db().collection('posts').where('status', '==', 'publico').onSnapshot((snapshot) => {
  const changes = snapshot.docChanges();
  changes.forEach((change) => {
    if (change.type === 'added') {
      showPosts(change.doc);
    } else if (change.type === 'removed') {
      const thisPost = containerPost.querySelector(`[data-id='${change.doc.id}']`);
      containerPost.removeChild(thisPost);
    } else if (change.type === 'modified') {
      const thisPost = containerPost.querySelector(`[data-id='${change.doc.id}']`);
      containerPost.removeChild(thisPost);
      showPosts(change.doc);
    }
  });
});

// DELETE & UPDATE POSTS
export const deletePosts = (idPost) => {
  db().collection('posts').doc(idPost).delete();
};

export const updatePost = (id, updatedData) => {
  db().collection('posts').doc(id).update(updatedData);
};

// UPLOAD POST
export const uploadPost = (file, editStatus, textValue, statusValue, id) => {
  const user = firebase.auth().currentUser;
  if (user && file) {
    const fileRef = firebase.storage().ref(`users/${user.uid}/${file.name}`);
    const uploadTask = fileRef.put(file);
    const textPost = textValue.value;
    uploadTask.then(() => fileRef.getDownloadURL().then((url) => {
      if (!editStatus) {
        savePosts(textPost, url, statusValue.value);
      } else {
        updatePost(id, {
          text: textPost,
          status: statusValue.value,
          photo: url,
        });
      }
    }));
  } else if (user && file === undefined) {
    if (!editStatus) {
      savePosts(textValue.value, 'photo', statusValue.value);
    } else {
      updatePost(id, {
        text: textValue.value,
        status: statusValue.value,
        photo: 'photo',
      });
    }
  }
};

// MY POSTS SECTION
export const myownPosts = (showPosts, containerPost, user) => db().collection('posts').where('uid', '==', user).onSnapshot((snapshot) => {
  const changes = snapshot.docChanges();
  changes.forEach((change) => {
    if (change.type === 'added') {
      showPosts(change.doc);
    } else if (change.type === 'removed') {
      const thisPost = containerPost.querySelector(`[data-id='${change.doc.id}']`);
      containerPost.removeChild(thisPost);
    } else if (change.type === 'modified') {
      const thisPost = containerPost.querySelector(`[data-id='${change.doc.id}']`);
      containerPost.removeChild(thisPost);
      showPosts(change.doc);
    }
  });
});

// PROFILE SECTION
export const profile = (container, uidUser, nameUser, photo) => {
  db().collection('users').doc(uidUser)
    .onSnapshot((doc) => {
      if (doc.exists) {
        nameUser.innerHTML = `USERNAME: ${doc.data().name}`;
        photo.src = doc.data().photo;
        if (doc.data().photo === 'no photo') {
          photo.src = '../img/userPhoto.svg';
        }
      }
    });
  container.querySelector('#editPhoto').onclick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const files = e.target.files;
      const reader = new FileReader();
      reader.onload = () => {
        db().collection('users').doc(uidUser).update({
          photo: reader.result,
        });
      };
      reader.readAsDataURL(files[0]);
    };
    input.click();
  };
};

// USER INFO IN EACH POST
export const profilePost = (uidPost, usernamePost, userphotoPost) => {
  db().collection('users').doc(uidPost)
    .onSnapshot((f) => {
      usernamePost.innerHTML = f.data().name;
      userphotoPost.src = f.data().photo;
      if (f.data().photo === 'no photo') {
        userphotoPost.src = '../img/userPhoto.svg';
      }
    });
};
