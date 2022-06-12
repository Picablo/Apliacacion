// Call the dataTables jQuery plugin
$(document).ready(function() {

});

async function iniciarSesion(){

    //Lo primero sera borra si hubiera culquier token no cerrado
    sessionStorage.clear();
    localStorage.clear();

    let datos = {};
    datos.mail = document.getElementById("txtEmail").value
    datos.password = document.getElementById("txtPassword").value


    const request = await fetch('api/jwt/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    const respuesta = await request.text();
    if (respuesta != 'FAIL'){
        localStorage.token = respuesta;
        window.location.href = 'usuarios.html'
    }else{
        swal({
            title: "Aviso!!",
            text: "Las credenciales son incorrectas.\nPor favor intente nuevamente",
            icon: "warning",
            button: "ok",
        });
    }
}