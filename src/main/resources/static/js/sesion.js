$(document).ready(function() {
});

let imagenSesion

if(localStorage.token == null){
    /*El token no existe*/
    let html = '<a class="dropdown-item" href="login.html"><i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Iniciar Sesión</a>';
    document.getElementById("divUsuLogin").innerHTML = html;
    imagenSesion = "img/undraw_withoutlogin.svg";
    document.getElementById("spanName").innerHTML= "";
    var URLactual = window.location;
    if(URLactual != "http://localhost:8080/login.html"){
        window.location.href = 'login.html';
    }
}else{




}

document.getElementById("imgSesion").src = imagenSesion;

/*
function crearSesion(){

    usuarios = await fetch('api/usuarios/usuid', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    userID = await usuarios.json();

    for (let usuario of userID) {
        $('#txtUserId').append("<option value="+ usuario.id+">"+usuario.nombre+" "+usuario.apellido+"</option>");
    }



        let request = await fetch('api/jwt/'+ localStorage.getItem("token"), {
           method: 'GET',
           headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
       });
       const id = await request.json();
}*/
