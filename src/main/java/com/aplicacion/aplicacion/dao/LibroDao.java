package com.aplicacion.aplicacion.dao;

import com.aplicacion.aplicacion.models.Libro;

import java.util.List;
import java.util.Map;

public interface LibroDao {

    List<Libro> getLibros();


    List<Integer> getLibrosPorUsuario(Integer id);

    List<Integer> getUsuariosPorLibro(Integer id);

    void eliminar(Integer id);

    void registrar(Libro libro);

    void modificar(Libro libro);

    void insertarLibroUsuario(Map<String, Object> libro);

    Libro obtenerLibroPorCredenciales(Libro libro);

    Libro obtenerLibroPorId(Integer id);

    List<String> obtenerListaAutores();

    List<String>obtenerListaCategorias();

    List<String> obtenerListaSecciones();

    Libro parseRequestBodyLibro(Map<String, Object> libro);

}
