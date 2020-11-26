const firestore = () => firebase.firestore();
const db = firestore;

export const createUserDB = (email, name, userUid, photo) => {
  const data = {
    name,
    email,
    userUid,
    photo,
  };
  return db().collection('users').doc(userUid).set(data)
    .then((response) => console.log(response))
    .catch((error) => console.log('Hubo un error', error));
};

export const savePosts = (textValue, photoValue) => {
  const user = firebase.auth().currentUser;
  const date = new Date();
  if (!user) {
    console.log('No hay user');
    return;
  }
  const data = {
    text: textValue,
    photo: photoValue,
    uid: user.uid,
    date,
  };
  firestore().collection('posts').add(data)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};
/*
export const printPost = () => {
  db().collection('posts').get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => showPosts(doc));
    })
    .catch((e) => console.log('error', e));
};
*/
