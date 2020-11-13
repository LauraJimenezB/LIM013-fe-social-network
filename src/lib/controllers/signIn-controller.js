import { signInUser } from '../firebase/auth.js';

export const logInUser = (email, password) => {
  signInUser(email, password)
    .then((res) => console.log('Funciono!', res))
    .catch((error) => console.log(error));
};
