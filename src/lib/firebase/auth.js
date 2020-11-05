//Creación de nueva cuenta de usuario
//import firebase from 'firebase';

export const signUpUser = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};