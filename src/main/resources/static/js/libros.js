// Call the dataTables jQuery plugin

$(document).ready(function() {
    cargarLibros();
  //$('#libros').DataTable();
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
        //let botonEliminar = '<a href="#" onclick="eliminarUsuario('+usuario.id+')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

        if(libro.fecha!=null){
            libro.fecha = libro.fecha.substr(0,10);
        }

        let libroHtml = '<tr><td>'+libro.tipo+'</td><td data-toggle="tooltip" data-placement="top" title="'+libro.descripcion+'">'+libro.nombre+'</td><td>'+libro.categoria+'</td><td>'+libro.seccion+'</td><td>'+libro.autor+'</td><td>'+libro.tamano+'</td><td>'+libro.fecha+'</td></tr>'
        listadoHtml += libroHtml;
    }

    document.querySelector('#libros tbody').outerHTML = listadoHtml;

    $('#libros').DataTable();

}

/*
async function eliminarUsuario(id){

    if(!confirm('¿Desea eliminar este usuario?')){
        return;
    }

    const request = await fetch('api/usuarios/' +id, {
        method: 'DELETE',
        headers: getHeaders()
    });

    location.reload()
}*/