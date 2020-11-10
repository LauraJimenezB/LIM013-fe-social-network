// importamos la funcion que vamos a testear
// import { createUser } from '../src/lib/controllers/signUp-controller.js';
import { signUpUser } from '../src/lib/firebase/auth.js';
const firebasemock = require('firebase-mock');

const mockAuth = new firebasemock.MockFirebase();
describe('createUser', () => {
  it('debería ser una función', () => {
    expect(typeof signUpUser).toBe('function');
  });
});
