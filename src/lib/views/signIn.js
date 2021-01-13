import { logInWithGoogle, logInUser } from '../controllers/signIn-controller.js';

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
      <h2 class="h2In">INICIA SESIÓN</h2>
      <p id="pSignIn">Te interesa la comida callejera?<br>Quieres compartir tu opinión y conocer la de otros?<br>Este es el lugar para tí!</p>
      <div> 
        <input class="formInput" id="emailSignIn" type="email" placeholder="Correo">
      </div> 
      <div> 
      <input class="formInput" id="passwordSignIn" type="password" placeholder="Contraseña">
      </div> 
    </form>
    <button id="signIn" class="signInButton">Aceptar</button>
    <div class='google'>
      <button id="googleButton"><img src='../img/google-icon.svg' width='40px' height='40px'></button>
    </div>
    <div class="footer">
      <p>No tienes una cuenta creada?<a href="#/signUp">Registrarse</a></p>
    </div>
  </section>
</div>
`;

  // document.getElementById('container').innerHTML = signInView;

  // Obteniendo
  const divElement = document.createElement('div');
  divElement.innerHTML = signInView;

  const googleButton = divElement.querySelector('#googleButton');
  googleButton.addEventListener('click', () => {
    logInWithGoogle();
  });

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
