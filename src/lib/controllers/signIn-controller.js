import { signInUser, signInGoogle, provider } from '../firebase/auth.js';

export const logInUser = (email, password) => {
  signInUser(email, password)
    .then((res) => console.log('Funciono!', res))
    .catch((error) => console.log(error));
};

export const logInWithGoogle = () => {
  signInGoogle(provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const token = result.credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(token, user);
  }).catch((error) => {
  // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    console.log(errorCode, errorMessage, email, credential);
  });
};
