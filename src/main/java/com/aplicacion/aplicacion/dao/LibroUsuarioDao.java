package com.aplicacion.aplicacion.dao;

import com.aplicacion.aplicacion.models.LibroUsuario;

import java.util.List;

public interface LibroUsuarioDao {

    List<LibroUsuario> getLibrosUsuarios();
    List<Integer> getUsuariosLibr(Integer id);
    List<Integer> getLibrosUsari(Integer id);

}
