// Call the dataTables jQuery plugin
$(document).ready(function() {

});

async function registrarUsuario(){

    let datos = {};
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

// Call the dataTables jQuery plugin
$(document).ready(function() {
    comprobarusuario();
    dataList();
    tableUserAccess();
});

let files;
let datos = {};
let fichero;
let autores;
let secciones;
let categorias;
let cambio = true;
let comprobacion;
//let ficheroFinal;


function getHeaders(){
    return {
        'Accept': 'application/json',
        //'Content-Type': 'application/json',
        'Authorization': localStorage.token
    };
}


async function registrarusuario(){

    datos.usuarioId = sessionStorage.getItem('usuario');
    datos.tipo = document.getElementById("txtTipo").value;
    datos.nombre = document.getElementById("txtNombre").value;
    datos.descripcion = document.getElementById("txtDescripcion").value;
    datos.fecha = document.getElementById("txtFecha").value;
    datos.autor = document.getElementById("txtAutor").value;
    datos.categoria = document.getElementById("txtCategoria").value;
    datos.seccion = document.getElementById("txtSeccion").value;
    datos.tamaño = document.getElementById("txtTamano").value;
    //usuario.Claves = document.getElementById("txtClaves").value;
    datos.ruta = document.getElementById("txtRuta").value;
    datos.isbn = document.getElementById("txtIsbn").value;
    //usuario.creador = document.getElementById("txtCreador").value;
    var selected = [];
    for (var option of document.getElementById("txtUserId").options)
    {
        if (option.selected) {
            selected.push(option.value);
        }

    }
    datos.usuarioId=selected;

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
                title: "Exito",
                text: "El usuario fue MODIFICADO",
                icon: "success",
                button: "ok",
            });
        }

        window.location.href = 'usuarios.html';
    }
}

async function comprobarusuario(){

    //Si el usuario es editado trae los datos
    if(sessionStorage.getItem('usuario')!=null){

        request = await fetch('api/usuario/'+window.sessionStorage.getItem('usuario'), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        usuario = await request.json()

        document.getElementById("txtNombre").value = usuario.nombre;
        document.getElementById("txtTipo").value = usuario.tipo;

        document.getElementById("txtTipo").value = usuario.descripcion;

        document.getElementById("txtAutor").value = usuario.autor;
        document.getElementById("txtCategoria").value = usuario.categoria;
        document.getElementById("txtSeccion").value = usuario.seccion;
        document.getElementById("txtTamano").value = usuario.tamano;

            datos.nombre = document.getElementById("txtNombre").value
            datos.apellido = document.getElementById("txtApellido").value
            datos.tipo = document.getElementById("txtTipo").value
            datos.mail = document.getElementById("
            ").value
            datos.password = document.getElementById("txtPassword").value
            datos.telefono = document.getElementById("txtTelefono").value

        document.getElementById("txtButton").innerHTML = "Actualizar";
    }
}

function cambiaPermisos(){
    cambio = true;
}

async function comprobarDatos(){

    comprobacion = true;
    let errores = "";

    if(datos.tipo == ""){
        comprobacion= false;
        errores = errores + "Tíene que subir un fichero para evitar error en el campo: TIPO\n";
    }
    if(datos.nombre == ""){
        comprobacion= false;
        errores = errores + "Tíene que rellenar el campo: NOMBRE\n";
    }
    if(datos.descripcion == ""){
        comprobacion= false;
        errores = errores + "Tíene que rellenar el campo: DESCRIPCION\n";
    }
    if(datos.fecha == ""){
        comprobacion= false;
        errores = errores + "Tíene que subir un fichero para evitar error en el campo: FECHA\n";
    }
    if(datos.autor == ""){
        comprobacion= false;
        errores = errores + "Tíene que rellenar el campo: AUTOR\n";
    }
    if(datos.categoria == ""){
        comprobacion= false;
        errores = errores + "Tíene que rellenar el campo: CATEGORIA\n";
    }
    if(datos.seccion == ""){
        comprobacion= false;
        errores = errores + "Tíene que rellenar el campo: SECCION\n";
    }
    if(datos.tamaño == ""){
        comprobacion= false;
        errores = errores + "Tíene que subir un fichero para evitar error en el campo: TAMAÑO\n";
    }
    //usuario.Claves = document.getElementById("txtClaves").value;
    if(datos.ruta == ""){
        comprobacion= false;
        errores =errores + "Tíene que subir un fichero para evitar error en el campo: RUTA\n";
    }
    //Expresion regular para calcualar que el ISBN es un número aunque sea string
    let valoresAceptados = /^[0-9]+$/;
     if(datos.isbn == "" || (datos.isbn).match(valoresAceptados) == null){
        comprobacion= false;
        document.getElementById("txtIsbn").value = "";
        errores = errores + "Tíene que rellenar el campo: ISBN\n";
        errores = errores + "ISBN (Es un numero entre 0 y 9999999999999)\n"
    }
    //usuario.creador = document.getElementById("txtCreador").value;
    if(datos.usuarioId == ""){
        comprobacion= false;
        errores = errores + "Debe seleccionar al menos un usuario de accedeso al usuario";
    }

    if(!comprobacion){
        swal({
            title: "Cuidado",
            text: errores,
            icon: "warning",
            button: "ok",
        });
    }
}