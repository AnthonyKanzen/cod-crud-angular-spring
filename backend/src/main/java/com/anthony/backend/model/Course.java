package com.anthony.backend.model;

import com.anthony.backend.enums.CourseStatus;
import com.anthony.backend.enums.Category;
import com.anthony.backend.enums.converters.CategoryConverters;
import com.anthony.backend.enums.converters.StatusConverters;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Data
@Entity
@SQLDelete(sql = "UPDATE course SET status = 'Inativo' WHERE id = ?")
@SQLRestriction("status = 'Ativo'")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("_id")
    private Long id;

    @Column(length = 200, nullable = false)
    private String name;

    @Convert(converter = CategoryConverters.class)
    @Column(length = 20, nullable = false)
    private Category category;

    @Convert(converter = StatusConverters.class)
    @Column(length = 20, nullable = false)
    private CourseStatus status = CourseStatus.ATIVO;
}