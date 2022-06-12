package com.aplicacion.aplicacion.controllers;

import com.aplicacion.aplicacion.dao.UsuarioDao;
import com.aplicacion.aplicacion.models.Usuario;
import com.aplicacion.aplicacion.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class AuthController {

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private JWTUtil jwtUtil;

    private boolean validarToken(String token) {
        String usuarioId = jwtUtil.getKey(token);
        return usuarioId != null;
    }

    @RequestMapping(value = "api/jwt/login", method = RequestMethod.POST)
    public String login(@RequestBody Usuario usuario){

        Usuario usuarioLogeado = usuarioDao.obtenerUsuarioPorCredenciales(usuario);

        if(usuarioLogeado != null){
            //Convertimos el token en ID-PERMISO
            String tokenJwt =jwtUtil.create((usuarioLogeado.getId())+"-"+(usuarioLogeado.getTipo()), "TOKEN");
            return tokenJwt;
        }
        return "FAIL";
    }

    @RequestMapping(value = "api/jwt/id", method = RequestMethod.GET)
    public String id(@RequestHeader(value = "Authorization") String token){
        //Rompemos el token y devolvemos solo el ID
        String[] parts = jwtUtil.getKey(token).split("-");
        return parts[0];
    }

    @RequestMapping(value = "api/jwt/menuOption", method = RequestMethod.GET)
    private String opcionMenu(@RequestHeader(value = "Authorization") String token) {
        String[] usuarioTipo = jwtUtil.getKey(token).split("-");
        return usuarioTipo[1];
    }


}
