import { savePosts } from '../firebase/firestore.js';

const firestore = () => firebase.firestore();
const db = firestore;
// eslint-disable-next-line import/no-cycle

export const post = (text) => {
  const photo = 'photo';
  savePosts(text, photo);
};

export const createPost = (showPosts) => db().collection('posts').get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => showPosts(doc));
  })
  .catch((e) => console.log('error', e));
