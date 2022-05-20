package com.aplicacion.aplicacion.controllers;

import com.aplicacion.aplicacion.dao.LibroDao;
import com.aplicacion.aplicacion.models.Libro;
import com.aplicacion.aplicacion.utils.JWTUtil;
/*import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;*/
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;


@RestController
public class LibroController {

    @Autowired
    private LibroDao libroDao;

    @Autowired
    private JWTUtil jwtUtil;

    private boolean validarToken(String token) {
        String libroId = jwtUtil.getKey(token);
        return libroId != null;
    }

    @RequestMapping(value = "api/libros/{id}", method = RequestMethod.GET)
    public Libro getLibro(@PathVariable Integer id){
        return libroDao.obtenerLibroPorId(id);
    }

    @RequestMapping(value = "api/libros/librosusuario/{id}", method = RequestMethod.GET)
    public List<Libro> getLibrosPorUsuario(@PathVariable Integer id){
        return libroDao.getLibrosPorUsuario(id);
    }

    /*@RequestMapping(value = "api/libros/usuarioslibro/{id}", method = RequestMethod.GET)
    public List<Integer> getUsuariosPorLibro(@PathVariable Integer id){
        return libroDao.getUsuariosPorLibro(id);
    }*/

    @RequestMapping(value = "api/libros", method = RequestMethod.GET)
    public List<Libro> getLibros(@RequestHeader(value = "Authorization") String token) {
        if (!validarToken(token)) { return null;}

        return libroDao.getLibros();
    }

    @RequestMapping(value = "api/libros", method = RequestMethod.POST)
    public void registrarLibros(@RequestBody Map<String, Object> libro){
        Libro cLibro = libroDao.parseRequestBodyLibro(libro);
        libroDao.registrar(cLibro);
    }

    @RequestMapping(value = "api/libro/{id}", method = RequestMethod.PUT)
    public void editarLibro(@RequestBody Map<String, Object> libro,
                            @PathVariable Integer id){
        Libro cLibro = libroDao.parseRequestBodyLibro(libro);
        Libro libroActual = libroDao.obtenerLibroPorId(id);

        //System.out.println(libro.get("tipo").toString());
        System.out.println(libro.get("nombre").toString());
        System.out.println(libro.get("descripcion").toString());
        /*Date fecha = new Date();
        cLibro.setFecha(fecha);*/
        System.out.println(libro.get("autor").toString());
        System.out.println(libro.get("categoria").toString());
        System.out.println(libro.get("seccion").toString());
        System.out.println(libro.get("tamaño").toString());
        System.out.println(libro.get("ruta").toString());
        System.out.println(libro.get("isbn").toString());
        //System.out.println(libro.get("creador").toString());

        //libroActual.setTipo(cLibro.getTipo());
        libroActual.setNombre(cLibro.getNombre());
        libroActual.setDescripcion(cLibro.getDescripcion());
        libroActual.setFecha(cLibro.getFecha());
        libroActual.setAutor(cLibro.getAutor());
        libroActual.setCategoria(cLibro.getCategoria());
        libroActual.setSeccion(cLibro.getSeccion());
        libroActual.setRuta(cLibro.getRuta());
        libroActual.setIsbn(cLibro.getIsbn());
        //libroActual.setCreador(cLibro.getCreador());

        libroDao.modificar(libroActual);

    }

    @RequestMapping(value = "api/libros/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value = "Authorization") String token,
                         @PathVariable Integer id) {
        if (!validarToken(token)) { return;}
        libroDao.eliminar(id);;
    }

    @RequestMapping(value = "api/libros/autores", method = RequestMethod.GET)
    public List<String> listaAutores(){
        return libroDao.obtenerListaAutores();
    }

    @RequestMapping(value = "api/libros/categorias", method = RequestMethod.GET)
    public List<String> listaCategorias(){
        return libroDao.obtenerListaCategorias();
    }

    @RequestMapping(value = "api/libros/secciones", method = RequestMethod.GET)
    public List<String> listaSecciones(){
        return libroDao.obtenerListaSecciones();
    }
}
