import { logInUser } from '../controllers/signIn-controller.js';

// eslint-disable-next-line no-unused-vars
export const signIn = () => {
  const signInView = `
  <div class="signInContainer" id="signInView">
  <header class="signInHeader">
    <div class="signInTitle">
      <h1>STREET FOOD</h1>
      <h3>Conoce y comparte experiencias</h3>
      </div>
  </header>
  <section class="signInForm">
    <form>
      <h2 class="h2In">SIGN IN</h2>
      <p>Bienvenid@ de nuevo!</p>
      <div> 
      <input class="formInput" id="emailSignIn" type="email" placeholder="Correo">
      </div> 
      <div> 
      <input class="formInput" id="passwordSignIn" type="password" placeholder="Contraseña">
      </div> 
    </form>
    <button id="signIn" class="signInButton">Sign In</button>
    <div class='google'>
      <button><img class="signInImg" src='../img/buscar.svg' width='40px' height='40px'></buttton>
    </div>
    <div class="footer">
      <p>No tienes una cuenta creada?<a href="#/signUp">Sign up</a></p>
    </div>
  </section>
</div>
`;

  // document.getElementById('container').innerHTML = signInView;

  // Obteniendo
  const divElement = document.createElement('div');
  divElement.innerHTML = signInView;

  const signInButton = divElement.querySelector('#signIn');
  signInButton.addEventListener('click', () => {
    const password = divElement.querySelector('#passwordSignIn').value;
    const email = divElement.querySelector('#emailSignIn').value;
    logInUser(email, password);
  });

  return divElement;
  /*
  document.getElementById('container').innerHTML = signInView;
  return document.getElementById('container');
  */
};
