const db = firebase.firestore();
export const createUserDB = (email, name, userUid, photo) => {
  const data = {
    name,
    email,
    userUid,
    photo
  };
  return db.collection('users').doc(userUid).set(data)
    .then((response) => console.log(response))
    .catch((error) => console.log('Hubo un error', error));
};
