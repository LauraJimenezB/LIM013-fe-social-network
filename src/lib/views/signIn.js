import { logInUser } from '../controllers/signIn-controller.js';

const signInView = (`
<div class="signInContainer" id="signInView">
  <header class="signInHeader">
    <div>
      <h1>STREET FOOD</h1>
      <h3>Conoce y comparte experiencias</h3>
      </div>
  </header>
  <section class="signInForm">
    <form>
      <h2>SIGN IN</h2>
      <p>Bienvenid@ de nuevo!</p>
      <input id="emailSignIn" type="email" placeholder="Correo">
      <input id="passwordSignIn" type="password" placeholder="Contraseña">
    </form>
    <button id="signIn" class="signInButton">Sign In</button>
    <div class='google'>
      <button><img class="signInImg" src='../img/buscar.svg' width='40px' height='40px'></buttton>
    </div>
    <div>
      <a>No tienes una cuenta creada?Sign in<a>
    </div>
  </section>
</div>
`);
document.getElementById('container').innerHTML = signInView;

// Obteniendo
const signInButton = document.getElementById('signIn');
signInButton.addEventListener('click', () => {
  const password = document.getElementById('passwordSignIn').value;
  const email = document.getElementById('emailSignIn').value;
  logInUser(email, password);
});
