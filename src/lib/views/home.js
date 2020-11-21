export const home = () => {
  const homeView = `<div class="homeContainer">
<header class="homeHeader">
  <nav>
    <ul>
      <li><a href="#"><h1>STREET FOOD</h1></a></li>
      <div class="homeOptions">
      <li><a>Sign In</a></li>
      <li><a>Sign Up</a></li>
      </div>
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
    <textarea>Escribe aquí tus opiniones</textarea>
    <div class="postButtons">
    <button>Add Image</button>
    <button>Send</button>
    </div>
  </section>
  <section>
    <!--Area de publicaciones-->
  </section>
</div>
</div>
`;
};
