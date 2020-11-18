const firebaseConfig = {
  apiKey: 'AIzaSyBjWOVdnEq1BUrjvZmkZcJ3SzLjd5KfNv4',
  authDomain: 'street-food-9698e.firebaseapp.com',
  databaseURL: 'https://street-food-9698e.firebaseio.com',
  projectId: 'street-food-9698e',
  storageBucket: 'street-food-9698e.appspot.com',
  messagingSenderId: '728672362135',
  appId: '1:728672362135:web:5454da68a206b7950e53d2',
  measurementId: 'G-SGQSFW9HVF'
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth;
const firestore = firebase.firestore;
export { auth, firestore };
