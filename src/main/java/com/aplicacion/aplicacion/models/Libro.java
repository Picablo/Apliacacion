package com.aplicacion.aplicacion.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "libros")
@ToString @EqualsAndHashCode
public class Libro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    @Column(name = "id")
    private Integer id;

    @Getter
    @Setter
    @Column(name = "tipo")
    private String tipo;

    @Getter
    @Setter
    @Column(name = "nombre")
    private String nombre;

    @Getter
    @Setter
    @Column(name = "descripcion")
    private String descripcion;

    @Getter
    @Setter
    @Column(name = "fecha")
    private Date fecha;

    @Getter
    @Setter
    @Column(name = "autor")
    private String autor;

    @Getter
    @Setter
    @Column(name = "categoria")
    private String categoria;

    @Getter
    @Setter
    @Column(name = "seccion")
    private String seccion;

    @Getter
    @Setter
    @Column(name = "tamano")
    private Integer tamano;

    @Getter
    @Setter
    @Column(name = "palabras_clave")
    private String palabrasClave;

    @Getter
    @Setter
    @Column(name = "ruta_archivo")
    private String ruta;

    @Getter
    @Setter
    @Column(name = "isbn")
    private Long isbn;

    @Getter
    @Setter
    @Column(name = "creador")
    private Integer creador;

    /*@OneToMany(mappedBy = "libro")
    @Getter @Setter
    private List<LibroUsuario> libroUsuarios;*/
   /* @OneToMany(mappedBy = "id_libro", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Getter @Setter
    private List<LibroUsuario> libroUsuarios;*/
    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(
            name = "libros_usuariose",
            joinColumns = {@JoinColumn(name = "id_libro")},
            inverseJoinColumns = {@JoinColumn(name = "id_usaurio")}
    )
    @Getter @Setter
    private List<Usuario> usuarios;
}


