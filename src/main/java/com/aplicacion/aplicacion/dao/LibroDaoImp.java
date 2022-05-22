package com.aplicacion.aplicacion.dao;

import com.aplicacion.aplicacion.models.Libro;
//import de.mkammerer.argon2.Argon2;
//import de.mkammerer.argon2.Argon2Factory;
import com.aplicacion.aplicacion.models.LibroUsuario;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.*;

import static java.lang.Integer.parseInt;
import static java.lang.Long.parseLong;

@Repository
@Transactional
public class LibroDaoImp implements LibroDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Libro> getLibros() {
        String query = "FROM Libro";
        return entityManager.createQuery(query).getResultList();
    }

   @Override
    public List<Integer> getLibrosPorUsuario(Integer idUsuario) {
       String query = "SELECT id FROM Libro ORDER BY id DESC";
       //String query = "SELECT DISTINCT id_libro FROM LibroUsuario WHERE id_usuario = :id";
       return entityManager.createQuery(query)
               //.setParameter("id",idUsuario)
               .getResultList();


    }

    @Override
     public List<Integer> getUsuariosPorLibro(Integer idLibro) {
        String query = "SELECT DISTINCT id_usuario FROM LibroUsuario WHERE id_usuario = :id";
        entityManager.createQuery(query)
                .setParameter("id",idLibro)
                .getResultList();

        return null;
    }

    @Override
    public void eliminar(Integer id) {
        //borra el libro seleccionado
        Libro libro = entityManager.find(Libro.class, id);
        entityManager.remove(libro);
        //Borra todos los libros_usuarios que hay asociados a ese libro
        String sql = "DELETE FROM LibroUsuario WHERE id_libro = :idLibro";
        entityManager.createQuery(sql)
                .setParameter("idLibro", id)
                .executeUpdate();
    }

    @Override
    public void registrar(Libro libro) {
        entityManager.merge(libro);
        //Devuelve el Id del ultimo libro
        String sql = "SELECT id FROM Libro ORDER BY id DESC";
        Query query = entityManager.createQuery(sql);
        String id = String.valueOf(query.setMaxResults(1).getResultList());

    }

    @Override
    public void modificar(Libro libro) {
        entityManager.merge(libro);
    }

    @Override
    public void insertarLibroUsuario(Map<String, Object> libro){
        String libroId;
        if(libro.get("libroId")==null) {
            libroId = null;
        }else{
            libroId = libro.get("libroId").toString();
        }
        String usuarioId = libro.get("usuarioId").toString();

        if(libroId==null){
            //Si el libro es nuevo preguntamos cual es el ultimo id generado
            String sql = "SELECT id FROM Libro ORDER BY id DESC";
            Query query = entityManager.createQuery(sql);
            libroId = String.valueOf(query.setMaxResults(1).getResultList());
            //Limpieza de Libro ID para quitar [xxxx] que vienen desde la consulta
            libroId = libroId.replaceAll("\\[", "")
                    .replaceAll("]", "");

        }else{
            //Borramos toda la lista de usuarios que vamos actualizar
            String sql = "DELETE FROM LibroUsuario WHERE id_libro = :idLibro";
            entityManager.createQuery(sql)
                    .setParameter("idLibro", parseInt(libroId))
                    .executeUpdate();
        }
        //Convertimos los usuarios string a array de int
        String[] separatedStrings = usuarioId.replaceAll("\\[", "")
                .replaceAll("]", "").split(",");

        int[] intUsarioId = new int[separatedStrings.length];

        //Cargamos el libro para los usuarios puedan verlo
        for(int i=0; i<intUsarioId.length; i++) {
            System.out.println(i);
        }

        //Actualizamos la base de datos con los usuarios que pueden ver el libro
        for(int i=0; i<intUsarioId.length; i++){
            String sql = "INSERT INTO libros_usuarios VALUES(?,?)";
            entityManager.createNativeQuery(sql)
                    .setParameter(1, libroId)
                    .setParameter(2, i)
                    .executeUpdate();
        }
    }

    @Override
    public Libro obtenerLibroPorCredenciales(Libro libro) {
        String query = "FROM Libro WHERE nombre = :nombre";
        List<Libro> lista = entityManager.createQuery(query)
                .setParameter("nombre",libro.getNombre())
                .getResultList();

        if(lista.isEmpty()){
            return null;
        }

        return lista.get(0);

    }

    @Override
    public Libro obtenerLibroPorId(Integer id) {
        String query = "FROM Libro WHERE id = :id";
        List<Libro> lista = entityManager.createQuery(query)
                .setParameter("id", id)
                .getResultList();

        if(lista.isEmpty()){
            return null;
        }

        return lista.get(0);
    }

    @Override
    public List<String> obtenerListaAutores() {
        String query = "SELECT DISTINCT autor FROM Libro";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public List<String> obtenerListaCategorias() {
        String query = "SELECT DISTINCT categoria FROM Libro";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public List<String> obtenerListaSecciones() {
        {
            String query = "SELECT DISTINCT seccion FROM Libro";
            return entityManager.createQuery(query).getResultList();
        }
    }

    @Override
    public Libro parseRequestBodyLibro(Map<String, Object> libro){
        Libro cLibro = new Libro();
        //El ide no se modifica porque es automatico cuando se genere y unico
        /*if(libro.getId()!=null) {
            cLibro.setId(parseInt(libro.getId()));
        }*/
        if(libro.get("tipo")!=null) {
            cLibro.setTipo(libro.get("tipo").toString());
        }
        if(libro.get("nombre").toString()!=null) {
            cLibro.setNombre(libro.get("nombre").toString());
        }
        if(libro.get("descripcion").toString()!=null) {
            cLibro.setDescripcion(libro.get("descripcion").toString());
        }
       // if(libro.getFecha()!=null) {
        //La fecha se actualiza siempre que se hace algo
            Date fecha = new Date();
            //LocalDate date = LocalDate.parse(libro.getFecha());
            cLibro.setFecha(fecha);
        //}
        if(libro.get("autor").toString()!=null) {
            cLibro.setAutor(libro.get("autor").toString());
        }
        if(libro.get("categoria").toString()!=null) {
            cLibro.setCategoria(libro.get("categoria").toString());
        }
        if(libro.get("seccion").toString()!=null) {
            cLibro.setSeccion(libro.get("seccion").toString());
        }
        if(libro.get("tamaño").toString()!=null) {
            cLibro.setTamano(Integer.parseInt(libro.get("tamaño").toString()));
        }
        if(libro.get("ruta").toString()!=null) {
            cLibro.setRuta(libro.get("ruta").toString());
        }
        if(libro.get("isbn").toString()!=null) {
            cLibro.setIsbn(Long.parseLong(libro.get("isbn").toString()));
        }

        //Por si se habilita el catador
        /*if(libro.get("creador").toString()!=null) {
            cLibro.setCreador(Integer.parseInt(libro.get("creador").toString()));
        }*/

        return cLibro;
    }


}