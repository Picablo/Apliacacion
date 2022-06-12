$(document).ready(function() {
});

let imagenSesion;
let nombreSesion;

function getHeaders(){
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    };
}

if(localStorage.token == null){
    /*El token no existe*/
    let html = '<a class="dropdown-item" href="login.html"><i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Iniciar Sesión</a>';
    document.getElementById("divUsuLogin").innerHTML = html;
    imagenSesion = "img/undraw_withoutlogin.svg";
    nombreSesion = "";
    var URLactual = window.location;

    if(document.getElementById("menuOption") != null){
        document.getElementById("menuOption").innerHTML = "";
    }

    if(URLactual != "http://localhost:8080/login.html"){
/*        swal({
            title: "Advertencia",
            text: "Necesita primero iniciar Sesión\nantes de poder usar la aplicación",
            icon: "warning",
            button: "ok",
        });*/
        window.location.href = 'login.html';
    }

}else{
    imagenSesion = "img/undraw_profile_1.svg";
    nombreSesion = "Usuario Logueado";
}

if(sessionStorage.menuOption == null){
    menuOption();
}


document.getElementById("imgSesion").src = imagenSesion;
document.getElementById("spanName").innerHTML= nombreSesion;
document.getElementById("menuOption").innerHTML = sessionStorage.menuOption;

function cerrarSesion(){
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = 'login.html';
}

async function menuOption(){
        request = await fetch('api/jwt/menuOption/', {
            method: 'GET',
            headers: getHeaders()
        });
        const tipo = await request.json();
        switch(tipo){
            case 0:
                sessionStorage.menuOption = '<!-- Heading --><div class="sidebar-heading">Tablas</div><!-- Nav Item - Pages Collapse Menu TABLAS --><li class="nav-item"><a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTablas" aria-expanded="true" aria-controls="collapseTwo"><i class="fas fa-fw fa-table"></i><span>Tablas</span></a><div id="collapseTablas" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar"><div class="bg-white py-2 collapse-inner rounded"><h6 class="collapse-header">Tablas:</h6><a class="collapse-item" href="libros.html">Libros</a></div></div></li>';
                break;
            case 1:
                sessionStorage.menuOption = '<!-- Heading --><div class="sidebar-heading">Tablas</div><!-- Nav Item - Pages Collapse Menu TABLAS --><li class="nav-item"><a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTablas" aria-expanded="true" aria-controls="collapseTwo"><i class="fas fa-fw fa-table"></i><span>Tablas</span></a><div id="collapseTablas" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar"><div class="bg-white py-2 collapse-inner rounded"><h6 class="collapse-header">Tablas:</h6><a class="collapse-item" href="libros.html">Libros</a></div></div></li><!-- Nav Item - Pages Collapse Menu ADMINISTRACION--><li class="nav-item"><a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"aria-expanded="true" aria-controls="collapseTwo"><i class="fas fa-fw fa-wrench"></i><span>Administración</span></a><div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar"><div class="bg-white py-2 collapse-inner rounded"><h6 class="collapse-header">Opciones:</h6><a class="collapse-item" href="librosadmin.html">Admin Libros</a><a class="collapse-item" href="usuarios.html">Admin Usuarios</a></div></div></li><!-- Nav Item - Utilities Collapse Menu CONFIGURACION--><li class="nav-item"><a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"aria-expanded="true" aria-controls="collapseUtilities"><i class="fas fa-fw fa-cog"></i><span>Configuración</span></a><div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"data-parent="#accordionSidebar"><div class="bg-white py-2 collapse-inner rounded"><h6 class="collapse-header">Pendiente de CUSTOMIZAR:</h6></div></div></li><!-- Divider --><hr class="sidebar-divider d-none d-md-block">';
                break;
            default:
                sessionStorage.menuOption = "";
                break;
        }
}
