package com.aplicacion.aplicacion.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "libros_usuarios")
@ToString
@EqualsAndHashCode
public class LibroUsuario implements Serializable {

    @Id
    @Getter @Setter @Column(name = "id_libro")
    private Integer id_libro;

    @Id
    @Getter @Setter @Column(name = "id_usuario")
    private Integer id_usuario;
}

