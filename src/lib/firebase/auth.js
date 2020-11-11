// Creación de nueva cuenta de usuario
const auth = firebase.auth();
export const signUpUser = (email, password) => auth.createUserWithEmailAndPassword(email, password);
