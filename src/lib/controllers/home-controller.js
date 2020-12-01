import { savePosts } from '../firebase/firestore.js';

const firestore = () => firebase.firestore();
const db = firestore;
// eslint-disable-next-line import/no-cycle

export const post = (text, status) => {
  const photo = 'photo';
  savePosts(text, photo, status);
};

export const createPost = (showPosts, containerPost) => db().collection('posts').orderBy('date', 'desc').onSnapshot((snapshot) => {
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
