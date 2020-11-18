/* eslint-disable no-unused-vars */
import { createUser } from '../controllers/signUp-controller.js';

export const signUp = () => {
  const signUpView = `
  <div class="signUpContainer">
  <header class="signUpHeader">
    <div class="signUpTitle">
    </div>
  </header>
  <section class="signUpForm">
    <form>
      <h2>SIGN UP</h2>
      <input class="signUpInput" id="name" type="text" placeholder="Nombre de usuario">
      <input  class="signUpInput" id="email" type="email" placeholder="Correo">
      <input  class="signUpInput" id="password" type="password" placeholder="Contraseña">
      <input class="signUpInput" id="confirmPassword" type="password" placeholder="Confirmar contraseña">
    </form>
    <button id="mySubmit" class="signUpButton">Sign Up</button>
    <div class='google'>
      <button><img src='../img/buscar.svg' width='40px' height='40px'></buttton>
    </div>
    <div class="signUpFooter">
      <p>Ya tienes una cuenta creada?<a href="#/signIn">Sign In</a></p>
    </div>
  </section>
</div>
`;
  // document.getElementById('container').innerHTML = signUpView;
  // Obteniendo

  const divElement = document.createElement('div');
  divElement.innerHTML = signUpView;

  const submitButton = divElement.querySelector('#mySubmit');
  submitButton.addEventListener('click', () => {
    const name = divElement.querySelector('#name').value;
    const email = divElement.querySelector('#email').value;

    if (divElement.querySelector('#password').value === divElement.querySelector('#confirmPassword').value) {
      if (divElement.querySelector('#password').value.length >= 6) {
        const password = divElement.querySelector('#password').value;
        createUser(email, password, name, 'no photo');
      } else {
        alert('La contraseña debe tener más de 6 caracteres');
      }
    } else {
      alert('Las contraseñas no coinciden');
    }
  });

  return divElement;
};
