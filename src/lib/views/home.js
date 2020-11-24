import { post } from '../controllers/home-controller.js';

export const home = () => {
  const homeView = `<div class="homeContainer">
<header class="homeHeader">
    <nav>
      <input type="checkbox" id="check">
      <label for="check" class="checkbtn">
        <i class="fas fa-bars"><img src='../img/vectorpaint.svg' width='40px' height='40px'></i>
      </label>
      <label class="logo">Street Food</label>
      <ul>
        <li><a class="active" href="#">Home</a></li>
        <li><a href="#/signIn">Log In</a></li>
        <li><a href="#/signUp">Sign Up</a></li>
      </ul>
    </nav>
</header>
<div class="main">
  <aside class="homeProfile">
    <figure>
      <img src="https://cdn.icon-icons.com/icons2/1674/PNG/512/person_110935.png" width="100px" height="100px">
    </figure>
    <figcaption>Username</figcaption>
  </aside>
  <section class="homeEditor">
    <textarea id="textValue" placeholder="Escribe aquí tus opiniones"></textarea>
    <div class="postButtons">
    <button>Add Image</button>
    <button id="send">Send</button>
    </div>
  </section>
  <section>
    <!--Area de publicaciones-->
  </section>
</div>
</div>
`;

  const divElement = document.createElement('div');
  divElement.innerHTML = homeView;
  // Obteniendo el valor del textarea
  const textValue = divElement.querySelector('#textValue');
  // Subiendo el valor a firestore
  const sendButton = divElement.querySelector('#send');
  sendButton.addEventListener('click', () => {
    post(textValue.value);
  });
  return divElement;
};
