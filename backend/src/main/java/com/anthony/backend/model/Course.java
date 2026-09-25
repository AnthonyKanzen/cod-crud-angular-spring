package com.anthony.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import lombok.Data;

@Data
@Entity
@SQLDelete(sql = "UPDATE Course SET status = 'INATIVO' WHERE id = ?")
@SQLRestriction("status = 'ATIVO'")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("_id")
    private Long id;

    @Column(length = 200, nullable = false)
    @NotBlank(message = "O nome do curso é obrigatório")
    @Size(max = 50, message = "O nome do curso deve ter no máximo 50 caracteres")
    private String name;

    @Column(length = 20, nullable = false)
    @NotBlank(message = "A categoria é obrigatória")
    private String category;

    @Column(length = 10, nullable = false)
    @NotNull(message = "O status é obrigatório")
    @Pattern(regexp = "ATIVO|INATIVO", message = "O status deve ser ATIVO ou INATIVO")
    private String status = "ATIVO";

}