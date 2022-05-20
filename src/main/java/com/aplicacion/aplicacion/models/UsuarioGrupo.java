package com.aplicacion.aplicacion.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Table;

@Table(name = "usuarios_grupos")
@ToString
@EqualsAndHashCode
public class UsuarioGrupo {
    @Getter @Setter @Column(name = "id_usuario")
    private Integer id_usuario;

    @Getter @Setter @Column(name = "id_grupo")
    private Integer id_grupo;
}

