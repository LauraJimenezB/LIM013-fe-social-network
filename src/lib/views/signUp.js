
const signUpView = ` 
<header>
    <h1>STREET FOOD</h1>
</header>
<form>
    <input id="name" type="text" placeholder="Nombre de usuario">
    <input id="email" type="email" placeholder="Correo">
    <input id="password" type="password" placeholder="Contraseña">
    <input id="confirmPassword" type="password" placeholder="Confirmar contraseña">
    <button id="mySubmit" class="signButton">Sign Up</button>
</form>
<a>Ya tienes una cuenta creada?Log in<a>
`
document.getElementById("container").innerHTML = signUpView;
//Obteniendo
const submitButton = document.getElementById("mySubmit");
submitButton.addEventListener("click", () => {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    if(document.getElementById("password").value === document.getElementById("confirmPassword").value){
        let password = document.getElementById("password").value
        return password;
    } else {
        alert("Las contraseñas no coinciden")
    }
    console.log(name, email, password)
})
