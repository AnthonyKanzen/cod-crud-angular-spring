package com.anthony.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import lombok.Data;

@Data
@Entity
@SQLDelete(sql = "UPDATE course SET status = 'INATIVO' WHERE id = ?")
@SQLRestriction("status = 'ATIVO'")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("_id")
    private Long id;

    @Column(length = 200, nullable = false)
    private String name;

    @Column(length = 20, nullable = false)
    private String category;

    @Column(length = 10, nullable = false)
    private String status = "ATIVO";

}