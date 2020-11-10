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
import { signUpUser } from '../src/lib/firebase/auth.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();
const mockdatabase = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
const mockstorage = new firebasemock.MockStorage();
const mockmessaging = new firebasemock.MockMessaging();
const mocksdk = new firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  (path) => (path ? mockdatabase.child(path) : mockdatabase),
  // use null if your code does not use AUTHENTICATION
  () => mockauth,
  // use null if your code does not use FIRESTORE
  () => mockfirestore,
  // use null if your code does not use STORAGE
  () => mockstorage,
  // use null if your code does not use MESSAGING
  () => mockmessaging,
);

const email = 'pepita@gmail.com';
const password = 'abc1d';
signUpUser(email, password);
mocksdk.auth().flush();
mocksdk.auth().getUserByEmail('pepita@gmail.com').then((user) => {
  console.assert(user, 'ben was created');
});
