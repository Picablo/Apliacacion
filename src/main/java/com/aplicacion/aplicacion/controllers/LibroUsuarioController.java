package com.aplicacion.aplicacion.controllers;

import com.aplicacion.aplicacion.dao.LibroUsuarioDao;
import com.aplicacion.aplicacion.models.LibroUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
public class LibroUsuarioController {

    @Autowired
    private LibroUsuarioDao libroUsuarioDao;

    @RequestMapping(value = "api/librosusuarios", method = RequestMethod.GET)
    public List<LibroUsuario> getLibrosUsuarios(){
        return libroUsuarioDao.getLibrosUsuarios();
    }
}
