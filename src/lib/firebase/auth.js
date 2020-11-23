// Creación de nueva cuenta de usuario
const auth = () => firebase.auth();

// Creando usuario con email y contraseña
export const signUpUser = (email, password) => auth()
  .createUserWithEmailAndPassword(email, password);
// Entrando a la cuenta
export const signInUser = (email, password) => auth()
  .signInWithEmailAndPassword(email, password);
export const signInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
};
// Trayendo el usuario
export const bringingUser = () => {
  auth().onAuthStateChanged((user) => {
    if (user) {
    // User is signed in.
    } else {
    // No user is signed in.
    }
  });
};
