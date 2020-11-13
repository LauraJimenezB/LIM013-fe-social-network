// Creación de nueva cuenta de usuario
// eslint-disable-next-line max-len
export const signUpUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);
// eslint-disable-next-line max-len
export const signInUser = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);
