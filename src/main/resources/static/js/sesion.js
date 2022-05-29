$(document).ready(function() {
});

let imagenSesion;
let nombreSesion;

if(localStorage.token == null){
    /*El token no existe*/
    let html = '<a class="dropdown-item" href="login.html"><i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Iniciar Sesión</a>';
    document.getElementById("divUsuLogin").innerHTML = html;
    imagenSesion = "img/undraw_withoutlogin.svg";
    nombreSesion = "";
    var URLactual = window.location;
    if(URLactual != "http://localhost:8080/login.html"){
        window.location.href = 'login.html';
    }
}else{

    imagenSesion = "img/undraw_profile_1.svg";
    nombreSesion = "Usuario Logueado";


}

document.getElementById("imgSesion").src = imagenSesion;
document.getElementById("spanName").innerHTML= nombreSesion;

function cerrarSesion(){
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = 'login.html';
    alert("Cerrar Sesion");
}
