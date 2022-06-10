package com.aplicacion.aplicacion.dao;

import com.aplicacion.aplicacion.models.Usuario;

import java.util.List;
import java.util.Map;

public interface UsuarioDao {

    List<Usuario> getUsuarios();

    void eliminar(Integer id);

    void registrar(Usuario usuario);

    void modificar(Usuario usuario);

    Usuario obtenerUsuarioPorCredenciales(Usuario usuario);

    List<Usuario> getUsuarioId();

    Usuario parseRequestBodyUsuario(Map<String, Object> Usuario);

    Usuario obtenerUsuarioPorId(Integer id);
}
