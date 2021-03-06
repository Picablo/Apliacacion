package com.aplicacion.aplicacion.controllers;

import com.aplicacion.aplicacion.dao.LibroDao;
import com.aplicacion.aplicacion.models.Libro;
import com.aplicacion.aplicacion.utils.JWTUtil;
/*import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;*/
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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

    private boolean validarAdmin(String token) {
        String[] usuarioAdmin = jwtUtil.getKey(token).split("-");
        return Integer.parseInt(usuarioAdmin[1]) == 1;
    }

    @RequestMapping(value = "api/libro/{id}", method = RequestMethod.GET)
    public Libro getLibro(@RequestHeader(value = "Authorization") String token,
                          @PathVariable Integer id) {
        if (!validarAdmin(token)) {return null;}

        return libroDao.obtenerLibroPorId(id);
    }

    @RequestMapping(value = "api/libros/libusu/{id}", method = RequestMethod.GET)
    public List<Libro> getLibrosPorUsu(@PathVariable Integer id, @RequestHeader(value = "Authorization") String token) {
        if (!validarToken(token)) {return null;}

        List<Libro> cLibro = new ArrayList<Libro>();
        List<Integer> nLibros = libroDao.getLibrosPorUsuario(id);

        if(nLibros!=null) {
            for (int i = 0; i < nLibros.size(); i++) {
                cLibro.add(libroDao.obtenerLibroPorId(nLibros.get(i)));
            }
        }else{return null;}

        return cLibro;
    }


    @RequestMapping(value = "api/libros/librosusuario/{id}", method = RequestMethod.GET)
    public List<Integer> getLibrosPorUsuario(@RequestHeader(value = "Authorization") String token,
                                             @PathVariable Integer id){
        if (!validarAdmin(token)) {return null;}

        return libroDao.getLibrosPorUsuario(id);
    }

    @RequestMapping(value = "api/libros/usuarioslibro/{id}", method = RequestMethod.GET)
    public List<Integer> getUsuariosPorLibro(@RequestHeader(value = "Authorization") String token,
                                             @PathVariable Integer id){
        if (!validarAdmin(token)) {return null;}

        return libroDao.getUsuariosPorLibro(id);
    }

    @RequestMapping(value = "api/libros", method = RequestMethod.GET)
    public List<Libro> getLibros(@RequestHeader(value = "Authorization") String token) {
        if (!validarAdmin(token)) {return null;}

        return libroDao.getLibros();
    }

    @RequestMapping(value = "api/libros", method = RequestMethod.POST)
    public void registrarLibros(@RequestHeader(value = "Authorization") String token,
                                @RequestBody Map<String, Object> libro){
        if (!validarAdmin(token)) {return;}

        Libro cLibro = libroDao.parseRequestBodyLibro(libro);
        libroDao.registrar(cLibro);

        libroDao.insertarLibroUsuario(libro);
    }

    @RequestMapping(value = "api/libro/{id}", method = RequestMethod.PUT)
    public void editarLibro(@RequestHeader(value = "Authorization") String token,
                            @RequestBody Map<String, Object> libro,
                            @PathVariable Integer id){
        if (!validarAdmin(token)) {return;}

        Libro cLibro = libroDao.parseRequestBodyLibro(libro);
        Libro libroActual = libroDao.obtenerLibroPorId(id);


        libroActual.setTipo(cLibro.getTipo());
        libroActual.setNombre(cLibro.getNombre());
        libroActual.setDescripcion(cLibro.getDescripcion());
        libroActual.setFecha(cLibro.getFecha());
        libroActual.setAutor(cLibro.getAutor());
        libroActual.setCategoria(cLibro.getCategoria());
        libroActual.setSeccion(cLibro.getSeccion());
        libroActual.setTamano(cLibro.getTamano());
        libroActual.setRuta(cLibro.getRuta());
        libroActual.setIsbn(cLibro.getIsbn());
        //libroActual.setCreador(cLibro.getCreador());

        libroDao.modificar(libroActual);
        libroDao.insertarLibroUsuario(libro);

    }

    @RequestMapping(value = "api/libros/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value = "Authorization") String token,
                         @PathVariable Integer id) {
        if (!validarAdmin(token)) {return;}

        libroDao.eliminar(id);;
    }

    @RequestMapping(value = "api/libros/autores", method = RequestMethod.GET)
    public List<String> listaAutores(@RequestHeader(value = "Authorization") String token){
        if (!validarAdmin(token)) {return null;}

        return libroDao.obtenerListaAutores();
    }

    @RequestMapping(value = "api/libros/categorias", method = RequestMethod.GET)
    public List<String> listaCategorias(@RequestHeader(value = "Authorization") String token){
        if (!validarAdmin(token)) {return null;}

        return libroDao.obtenerListaCategorias();
    }

    @RequestMapping(value = "api/libros/secciones", method = RequestMethod.GET)
    public List<String> listaSecciones(@RequestHeader(value = "Authorization") String token){
        if (!validarAdmin(token)) {return null;}

        return libroDao.obtenerListaSecciones();
    }
}
