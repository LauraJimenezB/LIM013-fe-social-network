// Creación de nueva cuenta de usuario
import { auth } from './init.js';

export const signUpUser = (email, password) => auth()
  .createUserWithEmailAndPassword(email, password);

export const signInUser = (email, password) => auth()
  .signInWithEmailAndPassword(email, password);
