import { createUserDB } from '../firebase/firestore.js';
import { signUpUser } from '../firebase/auth.js';

export const createUser = (email, password, name, photo) => {
  signUpUser(email, password)
    .then((res) => {
      window.location.hash = '#/home';
      createUserDB(res.user.uid, email, name, photo);
    })
    .catch((error) => {
      const errorCode = error.code;
      switch (errorCode) {
        case 'auth/email-already-in-use':
          alert('Ya existe una cuenta con este correo');
          break;
        case 'auth/invalid-email':
          alert('Ingrese un correo válido (por ejemplo alguien@example.com)');
          break;
        default:
           // do nothing
      }
    });
};
