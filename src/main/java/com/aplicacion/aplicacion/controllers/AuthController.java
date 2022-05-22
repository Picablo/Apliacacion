package com.aplicacion.aplicacion.controllers;

import com.aplicacion.aplicacion.dao.UsuarioDao;
import com.aplicacion.aplicacion.models.Usuario;
import com.aplicacion.aplicacion.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private JWTUtil jwtUtil;


    @RequestMapping(value = "api/jwt/login", method = RequestMethod.POST)
    public String login(@RequestBody Usuario usuario){

        Usuario usuarioLogeado = usuarioDao.obtenerUsuarioPorCredenciales(usuario);

        if(usuarioLogeado != null){
            String tokenJwt = jwtUtil.create(String.valueOf(usuarioLogeado.getId()), "TOKEN");

            System.out.println(jwtUtil.getKey(String.valueOf(tokenJwt)));
            return tokenJwt;
        }
        return "FAIL";
    }

    @RequestMapping(value = "api/jwt/{token}", method = RequestMethod.POST)
    public String id(@PathVariable String token){
        return jwtUtil.getKey(token);
    }
}
