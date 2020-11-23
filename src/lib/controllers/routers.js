import { components } from '../views/components.js';

export const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';

  switch (route) {
    case '':
    case '#/':
    { return container.appendChild(components.homeTemplate()); }
    case '#/signIn':
    { return container.appendChild(components.signInTemplate()); }
    case '#/signUp':
    { return container.appendChild(components.signUpTemplate()); }
    case '#/home':
    { return container.appendChild(components.homeTemplate()); }
    default:
      break;
  }
  return (route);
};
