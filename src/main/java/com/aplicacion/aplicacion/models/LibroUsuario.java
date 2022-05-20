package com.aplicacion.aplicacion.models;

//import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
//import lombok.ToString;

import javax.persistence.*;

//@Entity
@Table(name = "libros_usuarios")
//@ToString
//@EqualsAndHashCode
public class LibroUsuario {

    @Getter @Setter @Column(name = "id_libro")
    private Integer id_libro;

    @Getter @Setter @Column(name = "id_usaurio")
    private Integer id_ususario;

    /*@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    @Getter @Setter
    private  Libro libro;*/
    /*@JoinColumn(name = "id")
    @OneToMany(fetch=FetchType.LAZY)
    @Getter @Setter
    private Libro libro;*/
}

