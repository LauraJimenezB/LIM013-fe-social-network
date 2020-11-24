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
export const savePosts = (textValue, titleValue, photoValue, userUid) => {
  const data = {
    title: titleValue,
    text: textValue,
    photo: photoValue,
    uid: userUid,
  };
  return firestore().collection('posts').add(data)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};
