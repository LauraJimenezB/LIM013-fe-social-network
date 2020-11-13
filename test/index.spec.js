/* eslint-disable import/first */
/* eslint-disable import/order */
/* // importamos el mock-cloud-firestore
import { it } from '@jest/globals';
import MockFirebase from 'mock-cloud-firestore';
const fixtureData = {
    __collection__: {
      users: {
        __doc__: {
          abc1d: {
            name: 'Pepita',
            email: 'pepita@gmail.com',
            userUid: abc1d,
            photo: 'no photo'
          }
        }
      }
    }
}

global.firebase = new MockFirebase(fixtureData);
// importamos la funcion que vamos a testear
import { createUserDB } from '../src/lib/firebase/firestore.js';
describe('createUser', () => {
  it('debería ser una función', () => {
    expect(typeof createUserDB).toBe('function');
  });
  it('debería subir la información', () => {
    const email = 'pepita@gmail.com';
    const userUid= 'abc1d';
    const name = "Pepita";
    const photo= "no photo"
    return createUser(email, name, userUid, photo).then
  })
});
 */
// Importamos la función de registro

const firebasemock = require('firebase-mock');
/*
firebasemock.override();
*/

const mockauth = new firebasemock.MockAuthentication();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
  () => mockfirestore,
);

import { signUpUser } from '../src/lib/firebase/auth.js';

describe('se crea un usuario', () => {
  it('Debería poder registrarse un usuario', () => signUpUser('pepita@gmail.com', 'abc1d')
    .then((res) => {
      expect(res.email).toBe('pepita@gmail.com');
    }));
});
