package com.aplicacion.aplicacion.controllers;

import com.aplicacion.aplicacion.dao.UsuarioDao;
import com.aplicacion.aplicacion.models.Usuario;
import com.aplicacion.aplicacion.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    private boolean validarAdmin(String token) {
        String[] usuarioAdmin = jwtUtil.getKey(token).split("-");
        return Integer.parseInt(usuarioAdmin[1]) == 1;
    }

    @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.GET)
    public Usuario getUsuario(@RequestHeader(value = "Authorization") String token,
                              @PathVariable Integer id){
        if (!validarAdmin(token)) { return null;}

        return usuarioDao.obtenerUsuarioPorId(id);
    }

    @RequestMapping(value = "api/usuarios", method = RequestMethod.GET)
    public List<Usuario> getUsuarios(@RequestHeader(value = "Authorization") String token) {
        if (!validarAdmin(token)) {return null;}

        return usuarioDao.getUsuarios();
    }


    @RequestMapping(value = "api/usuarios", method = RequestMethod.POST)
    public void registrarUsuarios(@RequestHeader(value = "Authorization") String token,
                                  @RequestBody Usuario usuario){
        if (!validarAdmin(token)) {return;}

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1,1024,1, usuario.getPassword());
        usuario.setPassword(hash);

        usuarioDao.registrar(usuario);
    }

    @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value = "Authorization") String token,
                         @PathVariable Integer id) {
        if (!validarAdmin(token)) {return;}

        usuarioDao.eliminar(id);;
    }
    @RequestMapping(value = "api/usuario/{id}", method = RequestMethod.PUT)
    public void editarUsuario(@RequestHeader(value = "Authorization") String token,
                              @RequestBody Map<String, Object> usuario,
                            @PathVariable Integer id){
        if (!validarAdmin(token)) {return;}

        System.out.println("Ha editado");
        Usuario cUsuario = usuarioDao.parseRequestBodyUsuario(usuario);
        Usuario usuarioActual = usuarioDao.obtenerUsuarioPorId(id);

        //Encriptar la contraseña de cUsuario para Guardarla modificada
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1,1024,1, cUsuario.getPassword());
        cUsuario.setPassword(hash);

        usuarioActual.setNombre(cUsuario.getNombre());
        usuarioActual.setApellido(cUsuario.getApellido());
        usuarioActual.setMail(cUsuario.getMail());
        usuarioActual.setTipo(cUsuario.getTipo());
        usuarioActual.setPassword(cUsuario.getPassword());
        usuarioActual.setTelefono(cUsuario.getTelefono());

        usuarioDao.modificar(usuarioActual);
    }

    //Esta repe porque no es mas que un /api/usuarios
    @RequestMapping(value = "api/usuarios/usuid", method = RequestMethod.GET)
    public List<Usuario> getUsuarioId(@RequestHeader(value = "Authorization") String token) {
        if (!validarAdmin(token)) {return null;}

        return usuarioDao.getUsuarios();
    }
}
