/* eslint-disable no-unused-vars */
import { createUser } from '../controllers/signUp-controller.js';

const signUpView = (`
<div class="signUpContainer">
  <header class="signUpHeader">
    <div class="signUpTitle">
    <h1>Street Food</h1>
    <span class="iconify" data-icon="noto-v1:pot-of-food" data-inline="false"></span>
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
    <button id="mySubmit" class="signUpButton">Okay!</button>
    <div class='google'>
      <button><img src='../img/buscar.svg' width='40px' height='40px'></button>
    </div>
    <div class="signUpFooter">
      <a>Ya tienes una cuenta creada? Log in<a>
    </div>
  </section>
</div>
`);
document.getElementById('container').innerHTML = signUpView;
// Obteniendo
const submitButton = document.getElementById('mySubmit');
submitButton.addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  if (document.getElementById('password').value === document.getElementById('confirmPassword').value) {
    if (document.getElementById('password').value.length >= 6) {
      const password = document.getElementById('password').value;
      createUser(email, password, name, 'no photo');
    } else {
      alert('La contraseña debe tener más de 6 caracteres');
    }
  } else {
    alert('Las contraseñas no coinciden');
  }
});
