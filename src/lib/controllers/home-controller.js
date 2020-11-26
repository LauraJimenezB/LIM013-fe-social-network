import { savePosts } from '../firebase/firestore.js';

const firestore = () => firebase.firestore();
const db = firestore;
// eslint-disable-next-line import/no-cycle

export const post = (text) => {
  const photo = 'photo';
  savePosts(text, photo);
};
/*
export const createPost = (showPosts) => db().collection('posts').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach((change) => {
    if (change.type === 'added') {
      showPosts(change.doc);
    } else if (change.type === 'removed') {
      let publicPost = postArea.querySelector('[data-id=]' + change.doc.id + ']');
    }
  });
});
*/
/*db().collection('posts').get()
  .then((snapshot) => {
    db().collection('posts').orderBy('date', 'asc');
    snapshot.docs.forEach((doc) => showPosts(doc));
  })
  .catch((e) => console.log('error', e));*/
