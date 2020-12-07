import { savePosts } from '../firebase/firestore.js';

const firestore = () => firebase.firestore();
const db = firestore;
// eslint-disable-next-line import/no-cycle

export const post = (text, status, photo) => {
  // const photo = 'photo';
  savePosts(text, photo, status);
};

export const createPost = (showPosts, containerPost) => db().collection('posts').where('status', '==', 'publico').onSnapshot((snapshot) => {
  const changes = snapshot.docChanges();
  changes.forEach((change) => {
    if (change.type === 'added') {
      showPosts(change.doc);
      // console.log('change', change);
      /*
      const thisPost = containerPost.querySelector(`[data-id='${change.doc.id}']`);
      containerPost.prepend(thisPost);
      */
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

export const myownPosts = (showPosts, containerPost, user) => db().collection('posts').where('uid', '==', user).onSnapshot((snapshot) => {
  const changes = snapshot.docChanges();
  changes.forEach((change) => {
    if (change.type === 'added') {
      showPosts(change.doc);
      // console.log('change', change);
      /*
      const thisPost = containerPost.querySelector(`[data-id='${change.doc.id}']`);
      containerPost.prepend(thisPost);
      */
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

export const getMyPosts = (showPosts) => db().collection('posts').where('status', '==', 'privado')
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      showPosts(doc);
    });
  });
export const deletePosts = (e) => {
  e.stopPropagation();
  const idPost = e.target.parentElement.parentElement.getAttribute('data-id');
  db().collection('posts').doc(idPost).delete();
};
