package com.aplicacion.aplicacion.controllers;

import com.aplicacion.aplicacion.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

@RestController
public class FileUploadController {

    @Autowired
    private JWTUtil jwtUtil;

    private boolean validarAdmin(String token) {
        String[] usuarioAdmin = jwtUtil.getKey(token).split("-");
        return Integer.parseInt(usuarioAdmin[1]) == 1;
    }

    @RequestMapping(value = "api/upload", method = RequestMethod.POST)
    public Map<String, String> uploadFile(//@RequestHeader(value = "Authorization") String token,
                                          @RequestParam("file") MultipartFile file, RedirectAttributes attributes) throws IOException{

        //if (!validarAdmin(token)) { return null;}

        if(file == null || file.isEmpty()){
            return null;
        }

        StringBuilder builder = new StringBuilder();
        builder.append("C:\\Users\\CASA\\Desktop\\Aplicacion\\src\\main\\resources\\static\\ficheros\\libros");
        builder.append(File.separator);
        builder.append(file.getOriginalFilename());

        byte[] fileBytes = file.getBytes();
        Path path = Paths.get(builder.toString());
        Files.write(path, fileBytes);

        //Nombre del Fichero
        String fileName = file.getOriginalFilename();
        //Extension de Fichero
        String fileExtension = "";
        char ch;
        int len;
        if(fileName==null || (len = fileName.length())==0 || (ch = fileName.charAt(len-1))=='/' || ch=='\\' ||ch=='.' ) {
            fileExtension = "";
        }
        int dotInd = fileName.lastIndexOf('.'),	sepInd = Math.max(fileName.lastIndexOf('/'), fileName.lastIndexOf('\\'));
        if( dotInd <= sepInd ) {
            fileExtension = "";
        }
        else {
            fileExtension = fileName.substring(dotInd+1).toLowerCase();
        }


        HashMap<String, String> map = new HashMap<>();
        map.put("ruta", builder.toString());
        map.put("tipo", fileExtension);
        map.put("nombre", fileName);
        map.put("tamano", String.valueOf(file.getSize()));

        return map;
    }
}