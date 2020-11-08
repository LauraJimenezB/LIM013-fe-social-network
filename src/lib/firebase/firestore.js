
const db = firebase.firestore();
export const  createUserDB = (userUid, email, name, photo) => {
  db.collection("users").add({
        name: name,
        email: email,
        userUid: userUid,
        photo: photo,
    })
    .then(response => console.log(response))
    .catch(error => console.log("Hubo un error", error))
}
