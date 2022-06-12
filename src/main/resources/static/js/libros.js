// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarLibros();
});

function getHeaders(){
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    };
}

async function cargarLibros(){

    let request = await fetch('api/jwt/id', {
       method: 'GET',
       headers: getHeaders()
   });
   const id = await request.json();

    request = await fetch('api/libros/libusu/'+ id, {
        method: 'GET',
        headers: getHeaders()
    });
    const libros = await request.json();



    let listadoHtml = '';
    for (let libro of libros){

        if(libro.fecha!=null){
            libro.fecha = libro.fecha.substr(0,10);
        }

        let libroHtml = '<tr><td>'+libro.tipo+'</td><td data-toggle="tooltip" data-placement="top" title="'+libro.descripcion+'"><a href="ficheros/libros/'+libro.ruta+'" download>'+libro.nombre+'</a></td><td>'+libro.categoria+'</td><td>'+libro.seccion+'</td><td>'+libro.autor+'</td><td>'+libro.tamano+'</td><td>'+libro.fecha+'</td></tr>'
        listadoHtml += libroHtml;
    }

    document.querySelector('#libros tbody').outerHTML = listadoHtml;

    $('#libros').DataTable();

}