package com.aplicacion.aplicacion.dao;

import com.aplicacion.aplicacion.models.Usuario;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Map;

@Repository
@Transactional
public class UsaurioDaoImp implements UsuarioDao{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Usuario> getUsuarios() {
        String query = "FROM Usuario";
        return entityManager.createQuery(query).getResultList();

    }

    @Override
    public void eliminar(Integer id) {
        //Borra el usuario seleccionado
        Usuario usuario = entityManager.find(Usuario.class, id);
        entityManager.remove(usuario);
        //Borra todos los libros usuario que tuviera permiso de visualizar
        String sql = "DELETE FROM LibroUsuario WHERE id_usuario = :idLibro";
        entityManager.createQuery(sql)
                .setParameter("idLibro", id)
                .executeUpdate();
    }

    @Override
    public void registrar(Usuario usuario) {
        entityManager.merge(usuario);
    }

    @Override
    public void modificar(Usuario usuario) {
        entityManager.merge(usuario);
    }

    @Override
    public Usuario obtenerUsuarioPorCredenciales(Usuario usuario) {
        String query = "FROM Usuario WHERE mail = :mail";
        List<Usuario> lista = entityManager.createQuery(query)
                .setParameter("mail",usuario.getMail())
                .getResultList();

        if(lista.isEmpty()){
            return null;
        }

        String passwordHashed = lista.get(0).getPassword();

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        if (argon2.verify(passwordHashed, usuario.getPassword())){
            return lista.get(0);
        }
        return null;
    }


    @Override
    public List<Usuario> getUsuarioId(){
        String query = "SELECT id,nombre,tipo FROM Usuario";
        return entityManager.createQuery(query).getResultList();

    }
}
