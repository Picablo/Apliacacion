// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarLibros();
    sessionStorage.clear();
});

function getHeaders(){
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    };
}

async function cargarLibros(){

    const request = await fetch('api/libros', {
        method: 'GET',
        headers: getHeaders()
    });
    const libros = await request.json();



    let listadoHtml = '';
    for (let libro of libros){

        if(libro.fecha!=null){
            libro.fecha = libro.fecha.substr(0,10);
        }

        let botonEliminar = '<a href="#" onclick="eliminarLibro('+libro.id+')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
        let botonEditar = '<a href="#" onclick="editarLibro('+libro.id+')" class="btn  btn-warning btn-circle btn-sm"><i class="fas fa-exclamation-triangle"></i></a>';
        let libroHtml = '<tr><td>'+libro.tipo+'</td><td data-toggle="tooltip" data-placement="top" title="'+libro.descripcion+'"><a href="ficheros/libros/'+libro.ruta+'" download>'+libro.nombre+'</a></td><td>'+libro.categoria+'</td><td>'+libro.seccion+'</td><td>'+libro.autor+'</td><td>'+libro.tamano+'</td><td>'+libro.fecha+'</td><td>'+botonEditar+' '+botonEliminar+'</td></tr>'
        listadoHtml += libroHtml;
    }

    console.log(libros);


    document.querySelector('#libros tbody').outerHTML = listadoHtml;

    $('#libros').DataTable();
}

async function eliminarLibro(id){

    await swal({
      title: "¿Esta Seguro?",
      text: "!Una vez borrado el libro esta acción no puede ser deshecha!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("El libro ha sido borrado", {
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
//Funcion creado porque tiene que estar dentro principal del cuerpo de una funcion
//Sino da problemas ^^
async function borrar(id){
        const request = await fetch('api/libros/' +id, {
            method: 'DELETE',
            headers: getHeaders()
        });
        location.reload()
}

async function editarLibro(id){

    swal({
      title: "Editar",
      text: "¿Desea editar este Libro?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        sessionStorage.setItem('libro', id);
        window.location.href = "http://localhost:8080/librosupload.html";
      }else{
        return;
      }
    });
}