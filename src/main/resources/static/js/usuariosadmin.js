// Call the dataTables jQuery plugin
$(document).ready(function() {
    comprobarusuario();
});

let datos = {};
let comprobacion;

async function registrarUsuario(){

    datos.nombre = document.getElementById("txtNombre").value
    datos.apellido = document.getElementById("txtApellido").value
    datos.tipo = document.getElementById("txtTipo").value
    datos.mail = document.getElementById("txtEmail").value
    datos.password = document.getElementById("txtPassword").value
    datos.telefono = document.getElementById("txtTelefono").value


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

    comprobarDatos();
    if(comprobacion){
        if(sessionStorage.getItem('usuario')==null){
            const request = await fetch('api/usuarios', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
            swal({
                title: "Exito",
                text: "El usuario fue CREADO",
                icon: "success",
                button: "ok",
            });
        }else{
            const request = await fetch('api/usuario/'+usuario.id, {
                method: 'PUT',
                headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
                },
            body: JSON.stringify(datos)
            });
            sessionStorage.clear();
            swal({
                 itle: "Exito",
                 text: "El usuario fue MODIFICADO",
                 icon: "success",
                 button: "ok",
            });
        }

        window.location.href = 'usuarios.html';
    }
}

function getHeaders(){
    return {
        'Accept': 'application/json',
        //'Content-Type': 'application/json',
        'Authorization': localStorage.token
    };
}




async function comprobarusuario(){
    //Si el usuario es editado trae los datos
    if(sessionStorage.getItem('usuario')!=null){

        request = await fetch('api/usuarios/'+window.sessionStorage.getItem('usuario'), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        usuario = await request.json()

        document.getElementById("txtNombre").value = usuario.nombre;
        document.getElementById("txtApellido").value = usuario.apellido;
        document.getElementById("txtEmail").value = usuario.mail;
        document.getElementById("txtTipo").value = usuario.tipo;
        document.getElementById("txtPassword").value = "";
        document.getElementById("txtRepetirPassword").value = "";
        document.getElementById("txtTelefono").value = usuario.telefono;

        document.getElementById("txtButton").innerHTML = "Actualizar";
    }
}

async function comprobarDatos(){

    comprobacion = true;
    let errores = "";

    if(datos.nombre == "" || datos.nombre ==  null){
        errores = errores + "Tíene que rellenar el campo: NOMBRE\n";
    }
    if(datos.apellido == "" || datos.apellido ==  null){
        errores = errores + "Tíene que rellenar el campo: APELLIDO\n";
    }
    mailVerificacion = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!mailVerificacion.test(datos.mail)){
        errores = errores + "Revise el formato del campo: MAIL\n";
    }
    if(datos.tipo == "" || datos.tipo ==  null){
        errores = errores + "Tíene que asignar los permisos al usuario: TIPO\n";
    }
    if(datos.password == "" || datos.password ==  null){
        errores = errores + "Rellene el campo password: PASSWORD\n";
    }
    if(document.getElementById("txtRepetirPassword").value == ""){
        errores = errores + "Confirme el campo password: CONFIRME PASSWORD\n";
    }
    if(datos.telefono == "" || datos.telefono ==  null){
        errores = errores + "Tíene que rellenar el campo: TELEFONO\n";
    }


    if(errores != ""){
        comprobacion = false;
        swal({
            title: "Cuidado",
            text: errores,
            icon: "warning",
            button: "ok",
        });
    }
}