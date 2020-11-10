import { createUser } from '../controllers/signUp-controller.js';

const signUpView = ` 
<header>
    <h1>STREET FOOD</h1>
</header>
<form>
    <input id="name" type="text" placeholder="Nombre de usuario">
    <input id="email" type="email" placeholder="Correo">
    <input id="password" type="password" placeholder="Contraseña">
    <input id="confirmPassword" type="password" placeholder="Confirmar contraseña">
</form>
<button id="mySubmit" class="signButton">Sign Up</button>
<a>Ya tienes una cuenta creada?Log in<a>
`;
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
