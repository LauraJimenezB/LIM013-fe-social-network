/* eslint-disable no-unused-vars */
import { createUser } from '../controllers/signUp-controller.js';

const signUpView = ` 
<header>
    <h1>STREET FOOD</h1>
    <h3>Conoce y comparte experiencias</h3>
</header>
<section>
  <form class="signUpForm">
    <h2>SIGN UP</h2>
    <input class="signUpInput" id="name" type="text" placeholder="Nombre de usuario">
    <input class="signUpInput" id="email" type="email" placeholder="Correo">
    <input class="signUpInput" id="password" type="password" placeholder="Contraseña">
    <input class="signUpInput" id="confirmPassword" type="password" placeholder="Confirmar contraseña">
  </form>
  <button id="mySubmit" class="signButton">Sign Up</button>
  <div class='google'>
    <button><img src='../img/buscar.svg' width='40px' height='40px'></buttton>
  </div>
  <div>
    <a>Ya tienes una cuenta creada?Log in<a>
  </div>
</section>
`;
/* document.getElementById('container').innerHTML = signUpView; */
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
