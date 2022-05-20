package com.aplicacion.aplicacion.controllers;

import com.aplicacion.aplicacion.dao.UsuarioDao;
import com.aplicacion.aplicacion.models.Usuario;
import com.aplicacion.aplicacion.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UsuarioController {

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private JWTUtil jwtUtil;

    private boolean validarToken(String token) {
        String usuarioId = jwtUtil.getKey(token);
        return usuarioId != null;
    }

    @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.GET)
    public Usuario getUsuario(@PathVariable Long id){
        Usuario usuario = new Usuario();
        usuario.setId(id);
        usuario.setNombre("Pablo");
        usuario.setApellido("Gamez");
        usuario.setMail("pgamez@eusa.es");
        usuario.setTelefono("213123123");
        return usuario;
    }

    @RequestMapping(value = "api/usuarios", method = RequestMethod.GET)
    public List<Usuario> getUsuarios(@RequestHeader(value = "Authorization") String token) {
        if (!validarToken(token)) { return null;}

        return usuarioDao.getUsuarios();
    }


    @RequestMapping(value = "api/usuarios", method = RequestMethod.POST)
    public void registrarUsuarios(@RequestBody Usuario usuario){

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1,1024,1, usuario.getPassword());
        usuario.setPassword(hash);

        usuarioDao.registrar(usuario);
    }

    @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value = "Authorization") String token,
                         @PathVariable Long id) {
        if (!validarToken(token)) { return;}
        usuarioDao.eliminar(id);;
    }

    /*@RequestMapping(value = "api/usuarios/usuid", method = RequestMethod.GET)
    public List<LibroIdUsuarioNom> getUsuarioID() {
        return usuarioDao.getUsuarioID();
    }*/

}
