import { savePosts } from '../firebase/firestore.js';
// eslint-disable-next-line import/no-cycle

export const post = (text) => {
  const photo = 'photo';
  savePosts(text, photo);
};
