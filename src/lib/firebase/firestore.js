const firestore = () => firebase.firestore();
const db = firestore;

export const createUserDB = (email, name, userUid, photo) => {
  const data = {
    name,
    email,
    userUid,
    photo,
  };
  return db().collection('users').doc(userUid).add(data)
    .then((response) => (response))
    .catch((error) => (error));
};

export const savePost = (textValue, photoValue, statusValue, date, id) => {
  firestore().collection('posts').add({
    text: textValue,
    photo: photoValue,
    uid: id,
    date,
    status: statusValue,
  });
};

export const savePosts = (textValue, photoValue, statusValue) => {
  const user = firebase.auth().currentUser;
  const date = new Date();
  if (!user) {
    return;
  }
  savePost(textValue, photoValue, statusValue, date, user.uid);
};
