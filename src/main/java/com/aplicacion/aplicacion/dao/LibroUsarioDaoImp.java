package com.aplicacion.aplicacion.dao;

import com.aplicacion.aplicacion.models.Libro;
import com.aplicacion.aplicacion.models.Usuario;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.aplicacion.aplicacion.models.LibroUsuario;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class LibroUsarioDaoImp implements LibroUsuarioDao{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<LibroUsuario> getLibrosUsuarios() {
        String query = "FROM LibroUsuario";

        String query2 = "SELECT DISTINCT id FROM Libro INNER JOIN LibroUsuario";// ON LibroUsuario.id_libro = LibroUsuario.id WHERE LibroUsuario.id_usuario = :nombre";
        /*Object consulta = entityManager.createQuery(query2)
                //.setParameter("nombre", 7)
                .getResultList();*/
        System.out.println(entityManager.createQuery(query2).getResultList());

        return null;
    }

    @Override
    public List<Integer> getUsuariosLibr(Integer id){
        String query = "SELECT DISTINCT id_usarios FROM LibroUsario WHERE id_libros = :id";
        List<Integer> lista = entityManager.createQuery(query)
                .setParameter("id",id)
                .getResultList();

        if(lista.isEmpty()){
            return null;
        }

        return lista;

    }

    @Override
    public List<Integer> getLibrosUsari(Integer id){
        String query = "SELECT DISTINCT id_libro FROM LibroUsario WHERE id_usuarios = :id";
        List<Integer> lista = entityManager.createQuery(query)
                .setParameter("id",id)
                .getResultList();

        if(lista.isEmpty()){
            return null;
        }

        return lista;
    }
}
