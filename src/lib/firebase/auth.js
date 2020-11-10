// Creación de nueva cuenta de usuario
// import firebase from 'firebase';
const auth = firebase.auth();
export const signUpUser = (email, password) => auth.createUserWithEmailAndPassword(email, password);
