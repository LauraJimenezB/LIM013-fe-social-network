/* eslint-disable no-restricted-globals */
import { components } from '../views/components.js';

export const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';

  switch (route) {
    case '':
    case '#/':
    { const state = { page_id: 1 };
      const title = 'home';
      const url = '';
      history.pushState(state, title, url);
      return container.appendChild(components.homeTemplate()); }
    case '#/signIn':
    { const state = { page_id: 2 };
      const title = 'signIn';
      const url = '';
      history.pushState(state, title, url);
      return container.appendChild(components.signInTemplate()); }
    case '#/signUp':
    { const state = { page_id: 3 };
      const title = 'signUp';
      const url = '';
      history.pushState(state, title, url);
      return container.appendChild(components.signUpTemplate()); }
    case '#/home':
    { const state = { page_id: 1 };
      const title = 'home';
      const url = '';
      history.pushState(state, title, url);
      return container.appendChild(components.homeTemplate()); }
    default:
      break;
  }
  return (route);
};
