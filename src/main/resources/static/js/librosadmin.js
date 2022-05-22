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
        let libroHtml = '<tr><td>'+libro.tipo+'</td><td data-toggle="tooltip" data-placement="top" title="'+libro.descripcion+'">'+libro.nombre+'</td><td>'+libro.categoria+'</td><td>'+libro.seccion+'</td><td>'+libro.autor+'</td><td>'+libro.tamano+'</td><td>'+libro.fecha+'</td><td>'+botonEditar+' '+botonEliminar+'</td></tr>'
        listadoHtml += libroHtml;
    }

    console.log(libros);


    document.querySelector('#libros tbody').outerHTML = listadoHtml;

    $('#libros').DataTable();
}

async function eliminarLibro(id){

    if(!confirm('¿Desea eliminar este Libro?')){
        return;
    }

    const request = await fetch('api/libros/' +id, {
        method: 'DELETE',
        headers: getHeaders()
    });

    location.reload()
}

async function editarLibro(id){

    if(!confirm('¿Desea editar este Libro?')){
        return;
    }

    /*let libroSession;
    let var0 = ""; var1 = "";
    $("#libros tr").on('click', function() {


            var0 = $(this).find('td:eq(0)').html();
            var1 = $(this).find('td:eq(1)').html();
            var2 = $(this).find('td:eq(2)').html();
            var3 = $(this).find('td:eq(3)').html();
            var4 = $(this).find('td:eq(4)').html();
            var5 = $(this).find('td:eq(5)').html();
            var6 = $(this).find('td:eq(6)').html();

            libroSession = {id: id,
                            tipo: var0,
                            nombre: var1,
                            categoria: var2,
                            seccion: var3,
                            autor: var4,
                            tamano: var5,
                            fecha: var6
            };


            sessionStorage.setItem('libro', JSON.stringify(libroSession));

            window.location.href = "http://localhost:8080/librosupload.html";
    });*/
    sessionStorage.setItem('libro', id);

    window.location.href = "http://localhost:8080/librosupload.html";

}