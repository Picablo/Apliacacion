package com.aplicacion.aplicacion.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name = "libros_grupos")
@ToString
@EqualsAndHashCode
public class LibroGrupo {
    @Getter @Setter @Column(name = "id_libro")
    private Integer id_libro;

    @Getter @Setter @Column(name = "id_grupo")
    private Integer id_grupo;
}
