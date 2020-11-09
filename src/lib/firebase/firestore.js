const db = firebase.firestore();
export const createUserDB = (userUid, email, name, photo) => {
  db.collection('users').add({
    name,
    email,
    userUid,
    photo,
  })
    .then((response) => console.log(response))
    .catch((error) => console.log('Hubo un error', error));
};
