// Este es el punto de entrada de tu aplicacion
import { changeView } from './lib/controllers/routers.js';
import { firebaseInit } from './lib/firebase/init.js';

const init = () => {
  firebaseInit();
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};

window.addEventListener('load', init);
