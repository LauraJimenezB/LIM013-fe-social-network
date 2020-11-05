import {signUpUser} from '../firebase/auth.js';

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
`
document.getElementById("container").innerHTML = signUpView;
//Obteniendo
let data={};
const submitButton = document.getElementById("mySubmit");
submitButton.addEventListener("click", () => {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    
    if(document.getElementById("password").value === document.getElementById("confirmPassword").value){
        if (document.getElementById("password").value.length>=6) {
            let password = document.getElementById("password").value;
            signUpUser(email, password)
            .then((result) => console.log(result))
            .catch((result)=> console.log(result))
        }
        else {
            alert ("La contraseña debe tener más de 6 caracteres");
        }
    } else {
        alert("Las contraseñas no coinciden")
    }
})

