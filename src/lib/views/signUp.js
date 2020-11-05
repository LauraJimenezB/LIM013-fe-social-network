const signUpView = 
`<header>
    <h1>STREET FOOD</h1>
</header>
<form>
    <input id="name" type="text" placeholder="Nombre de usuario">
    <input id="email" type="email" placeholder="Correo">
    <input id="password" type="password" placeholder="Contraseña">
    <input id="confirmPassword" type="password" placeholder="Confirmar contraseña">
</form>
<button id="mySubmit" class="signButton">Sign Up</button>
<a>Ya tienes una cuenta creada?Log in<a>`
document.getElementById("container").innerHTML = signUpView;
let data = {};

//Obteniendo datos del usuario

const submitButton = document.getElementById("mySubmit");
submitButton.addEventListener("click", () => {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    if( document.getElementById("password").value === document.getElementById("confirmPassword").value ){
        let password = document.getElementById("password").value
        data = {
            user: name,
            email: email,
            password: password
        }
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          })
        console.log(data)
    } else {
        alert("Las contraseñas no coinciden")
    }
})
