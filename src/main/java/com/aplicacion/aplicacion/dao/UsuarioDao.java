package com.aplicacion.aplicacion.dao;

import com.aplicacion.aplicacion.models.Usuario;

import java.util.List;

public interface UsuarioDao {

    List<Usuario> getUsuarios();

    void eliminar(Long id);

    void registrar(Usuario usuario);

    void modificar(Usuario usuario);

    Usuario obtenerUsuarioPorCredenciales(Usuario usuario);

    //List<LibroIdUsuarioNom> getUsuarioID();
}
