import { components } from '../views/components.js';

export const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  console.log(route);

  switch (route) {
    case '':
    case '#/':
    { return container.appendChild(components.signInTemplate()); }
    case '#/signIn':
    { return container.appendChild(components.signInTemplate()); }
    case '#/signUp':
    { return container.appendChild(components.signUpTemplate()); }
    default:
      break;
  }
  return (route);
};
