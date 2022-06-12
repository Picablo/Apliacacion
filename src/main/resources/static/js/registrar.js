// Call the dataTables jQuery plugin
$(document).ready(function() {

});

async function registrarUsuario(){

    let datos = {};
    datos.nombre = document.getElementById("txtNombre").value
    datos.apellido = document.getElementById("txtApellido").value
    datos.mail = document.getElementById("txtEmail").value
    datos.password = document.getElementById("txtPassword").value

    let repetirPassword = document.getElementById("txtRepetirPassword").value

    let error = ""

    if(datos.nombre == ""){
        error = "Debe rellenar el campo: NOMBRE\n";
    }

    if(datos.apellido == ""){
        error = error + "Debe rellenar el campo: APELLIDO\n";
    }

    mailVerificacion = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!mailVerificacion.test(datos.mail)){
        error = error +  "El MAIL no cumple los requisitos\n";
    }

    if (repetirPassword != datos.password || datos.password == "") {
        error = error +  "Compruebe el PASSWORD";
    }

    if( error != ""){
        swal({
            title: "Aviso!!",
            text: error,
            icon: "warning",
            button: "ok",
        });

        return;
    }


    const request = await fetch('api/usuarios', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    swal({
        title: "Exito!!",
        text: "El usuario fue creado correctamente",
        icon: "success",
        button: "ok",
    })
    .then((value) => {
        window.location.href = 'login.html';
    });
}
