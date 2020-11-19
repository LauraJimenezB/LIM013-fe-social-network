// Creación de nueva cuenta de usuario
const auth = () => firebase.auth();

// Creando usuario con email y contraseña
export const signUpUser = (email, password) => auth()
  .createUserWithEmailAndPassword(email, password);
// Entrando a la cuenta
export const signInUser = (email, password) => auth()
  .signInWithEmailAndPassword(email, password);
// Trayendo el proveedor de google
/*
export const provider = new firebase.auth.GoogleAuthProvider();
// Trayendo el popUp
export const signInGoogle = () => auth()
  .signInWithPopup(provider);
*/

export const signInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
};
