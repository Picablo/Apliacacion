// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarUsuarios();
});

function getHeaders(){
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    };
}

async function cargarUsuarios(){

    const request = await fetch('api/usuarios', {
        method: 'GET',
        headers: getHeaders()
    });
    const usuarios = await request.json();



    let listadoHtml = '';
    for (let usuario of usuarios){

        let botonEliminar = '<a href="#" onclick="eliminarUsuario('+usuario.id+')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
        let botonModificar = '<a href="#" onclick="editarUsuario('+usuario.id+')" class="btn  btn-warning btn-circle btn-sm"><i class="fas fa-exclamation-triangle"></i></a>';
        let usuarioHtml = '<tr><td>'+usuario.id+'</td><td>'+usuario.nombre+' '+usuario.apellido+'</td><td>'+usuario.mail+'</td><td>'+usuario.telefono+'</td><td>'+botonEliminar+' '+botonModificar+'</td></tr>';
        listadoHtml += usuarioHtml;
    }

    document.querySelector('#usuarios tbody').outerHTML = listadoHtml;

    $('#usuarios').DataTable();
}

async function eliminarUsuario(id){

    await swal({
      title: "¿Esta Seguro?",
      text: "!Una vez borrado el Usuario esta acción no puede ser deshecha!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("El Usuario ha sido borrado", {
          icon: "success",
          buttons: true
        })
        .then((willDelete) => {
              if (willDelete) {
                borrar(id);
              }else{
                location.reload();
              }
        });
      } else {
        return;
      }
    });
}


async function borrar(id){
    const request = await fetch('api/usuarios/' +id, {
        method: 'DELETE',
        headers: getHeaders()
    });

    location.reload()
}

async function editarUsuario(id){

    swal({
      title: "Editar",
      text: "¿Desea editar este Usuario?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        sessionStorage.setItem('usuario', id);
        window.location.href = "http://localhost:8080/usuariosadmin.html";
      }else{
        return;
      }
    });
}