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

    if (repetirPassword != datos.password) {
        swal({
            title: "Aviso!!",
            text: "La contraseña que escribiste es diferente",
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
    alert("La cuenta fue creada con exito");
    window.location.href = 'principal.html';
}
