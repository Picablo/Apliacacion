// Call the dataTables jQuery plugin
$(document).ready(function() {
    comprobarLibro();
    dataList();
    tableUserAccess();
});

const dropArea = document.querySelector(".drop-area");
const dropText = dropArea.querySelector("h2");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("#input-file");
//const html = document.querySelector("#preview").innerHTML;

let files;
let datos = {};
let fichero;
let autores;
let secciones;
let categorias;
let cambio = true;
let comprobacion;
//let ficheroFinal;

button.addEventListener("click", (e) => {
    input.click();
});

input.addEventListener("change", (e) => {
    files = his.files;
    dropArea.classList.add("active)");
    showFiles(files);
    dropArea.classList.remove("active");
});

dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("active");
//    dragText.textContent = "Suelta para subir los archivos";
});

dropArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropArea.classList.remove("active");
//    dragText.textContent = "Arrastra y suelta archivos";
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    files = e.dataTransfer.files;
    showFiles(files);
    dropArea.classList.remove("active");
//    dragText.textContent = "Arrastra y suelta archivos";
});

function getHeaders(){
    return {
        'Accept': 'application/json',
        //'Content-Type': 'application/json',
        'Authorization': localStorage.token
    };
}

function showFiles(files){
    if(files.length == undefined){
        proccesFile(files);
    }else{
        for(const file of files){

            proccesFile(file);
        }
    }
}

function proccesFile(file){
    const docType = file.type;
    const validExtensions = ["image/png", "image/bmp", "image/gif", "image/jpeg", "image/tiff", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf"];
    const TamanioMaxBYTES = 10000000; // 1MB = 1 millón de bytes

    //Comprobamos que el tamaño no sea superior a 10 MB
    if(file.size <= TamanioMaxBYTES){
        if(validExtensions.includes(docType)){
            //archivo valido
            const fileReader = new FileReader();
            const id = `file-${Math.random().toString(32).substring(7)}`;
            fileReader.addEventListener('load', e =>{
                const fileUrl = fileReader.result;
                const image = `
                    <div id="${id}" class="file-container">
                        <img src="${fileUrl}" alt="${file.name}" width="50">
                        <div class="status">
                            <span>${file.name}</span>
                            <span class="status-text">
                                Loading...
                            </span>
                        </div>
                    </div>
                `;

                //const html = document.querySelector("#preview").innerHTML;
                //document.querySelector("#preview").innerHTML = image + html;
            });

            fileReader.readAsDataURL(file);
            uploadFile(file);
        }else{
            //archivo no valido
            swal({
                title: "Error los archivos permitidos son:",
                text: validExtensions.join(', '),
                icon: "warning",
                button: "ok",
            });
        }
    }else{
        //archivo no valido
        swal({
            title: "Error el fichero supera el máximo tamaño permitido:",
            text: "MÁXIMO "+ TamanioMaxBYTES / 1000000 +"MB",
            icon: "warning",
            button: "ok",
        });
    }
}

async function uploadFile(file){
    const formData = new FormData();
    formData.append("file",file);

    try{
        const request = await fetch('api/upload', {
            method: 'POST',
            headers: getHeaders(),
            body: formData
        });
        //Datos que son devueltos de Spring Boot despues de subir el fichero
        const requestText = await request.text();

        fichero = JSON.parse(requestText);

        document.getElementById("txtTipo").value = fichero.tipo;
        document.getElementById("txtRuta").value = fichero.nombre;
        document.getElementById("txtTamano").value = fichero.tamano;
        if(document.getElementById("txtNombre").value == "" ){
            document.getElementById("txtNombre").value = fichero.nombre;
        }

        date = new Date;

        year = date.getFullYear();
        month = date.getMonth()+1;
        if(month < 10){
            month = "0"+ month;
        }
        day = date.getDate();
        if(day < 10){
            day = "0"+ day;
        }
        date = year+"-"+month+"-"+day;
        document.getElementById("txtFecha").value = date;



    }catch (error){}
}

async function registrarLibro(){

    datos.libroId = sessionStorage.getItem('libro');
    datos.tipo = document.getElementById("txtTipo").value;
    datos.nombre = document.getElementById("txtNombre").value;
    datos.descripcion = document.getElementById("txtDescripcion").value;
    datos.fecha = document.getElementById("txtFecha").value;
    datos.autor = document.getElementById("txtAutor").value;
    datos.categoria = document.getElementById("txtCategoria").value;
    datos.seccion = document.getElementById("txtSeccion").value;
    datos.tamaño = document.getElementById("txtTamano").value;
    //libro.Claves = document.getElementById("txtClaves").value;
    datos.ruta = document.getElementById("txtRuta").value;
    datos.isbn = document.getElementById("txtIsbn").value;
    //libro.creador = document.getElementById("txtCreador").value;
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
        if(sessionStorage.getItem('libro')==null){
            const request = await fetch('api/libros', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
            swal({
                title: "Exito",
                text: "El libro fue CREADO",
                icon: "success",
                button: "ok",
            });
        }else{
            const request = await fetch('api/libro/'+libro.id, {
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
                text: "El libro fue MODIFICADO",
                icon: "success",
                button: "ok",
            });
        }

        window.location.href = 'libros.html';
    }
}

async function comprobarLibro(){

    //Si el libro es editado trae los datos
    if(sessionStorage.getItem('libro')!=null){

        request = await fetch('api/libro/'+window.sessionStorage.getItem('libro'), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        libro = await request.json()

        document.getElementById("txtTipo").value = libro.tipo;
        document.getElementById("txtNombre").value = libro.nombre;
        document.getElementById("txtDescripcion").value = libro.descripcion;
        if(libro.fecha!=null){
            document.getElementById("txtFecha").value = libro.fecha.slice(0,10);
        }
        document.getElementById("txtAutor").value = libro.autor;
        document.getElementById("txtCategoria").value = libro.categoria;
        document.getElementById("txtSeccion").value = libro.seccion;
        document.getElementById("txtTamano").value = libro.tamano;
        //document.getElementById("txtClaves").value = libro.Claves;
        document.getElementById("txtRuta").value = libro.ruta;
        document.getElementById("txtIsbn").value = libro.isbn;
        //document.getElementById("txtCreador").value = libro.creador;

        document.getElementById("txtButton").innerHTML = "Actualizar";
    }
}
async function dataList(){
    //Con esta Funciona añadimos datos para los DataList para
    //Autores - Secciones - Categorias
    let request;

    request = await fetch('api/libros/autores', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    autores = await request.json();

    request = await fetch('api/libros/secciones', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    secciones = await request.json();

    request = await fetch('api/libros/categorias', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    categorias = await request.json();

    for (var i = 0; i < autores.length; i++) {
        $('#listAutor').append("<option value='" + autores[i] + "'>");
    }

    for (var i = 0; i < secciones.length; i++) {
        $('#listSeccion').append("<option value='" + secciones[i] + "'>");
    }

    for (var i = 0; i < categorias.length; i++) {
        $('#listCategoria').append("<option value='" + categorias[i] + "'>");
    }
}

async function tableUserAccess(){
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
}

function cambiaPermisos(){
    cambio = true;
}

async function comprobarDatos(){

    comprobacion = true;
    let errores = "";

    if(datos.tipo == ""){
        errores = errores + "Tíene que subir un fichero para evitar error en el campo: TIPO\n";
    }
    if(datos.nombre == ""){
        errores = errores + "Tíene que rellenar el campo: NOMBRE\n";
    }
    if(datos.descripcion == ""){
        errores = errores + "Tíene que rellenar el campo: DESCRIPCION\n";
    }
    if(datos.fecha == ""){
        errores = errores + "Tíene que subir un fichero para evitar error en el campo: FECHA\n";
    }
    if(datos.autor == ""){
        errores = errores + "Tíene que rellenar el campo: AUTOR\n";
    }
    if(datos.categoria == ""){
        errores = errores + "Tíene que rellenar el campo: CATEGORIA\n";
    }
    if(datos.seccion == ""){
        errores = errores + "Tíene que rellenar el campo: SECCION\n";
    }
    if(datos.tamaño == ""){
        errores = errores + "Tíene que subir un fichero para evitar error en el campo: TAMAÑO\n";
    }
    //libro.Claves = document.getElementById("txtClaves").value;
    if(datos.ruta == ""){
        errores =errores + "Tíene que subir un fichero para evitar error en el campo: RUTA\n";
    }
    //Expresion regular para calcualar que el ISBN es un número aunque sea string
    let valoresAceptados = /^[0-9]+$/;
     if(datos.isbn == "" || (datos.isbn).match(valoresAceptados) == null){
        document.getElementById("txtIsbn").value = "";
        errores = errores + "Tíene que rellenar el campo: ISBN\n";
        errores = errores + "ISBN (Es un numero entre 0 y 9999999999999)\n"
    }
    //libro.creador = document.getElementById("txtCreador").value;
    if(datos.usuarioId == ""){
        errores = errores + "Debe seleccionar al menos un usuario de accedeso al libro";
    }

    if(errores != ""){
        comprobacion=false;
        swal({
            title: "Cuidado",
            text: errores,
            icon: "warning",
            button: "ok",
        });
    }
}

