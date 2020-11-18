// Este es el punto de entrada de tu aplicacion
import { changeView } from './lib/controllers/routers.js';

const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashChange', () => changeView(window.location.hash));
};

window.addEventListener('load', init);
