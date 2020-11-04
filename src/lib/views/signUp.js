//Sign Up View
export default () => {
const signUpView = ` 
<form>
    <input type="text" placeholder="Nombre de usuario">
    <input type="email" placeholder="Correo">
    <input type="password" placeholder="Contraseña">
    <input type="password" placeholder="Confirmar contraseña">
    <input type="submit" placeholder="Sign Up">
</form>
<a>Ya tienes una cuenta creada?Log in<a>
`
}
document.getElementById("container").innerHTML = signUpView;