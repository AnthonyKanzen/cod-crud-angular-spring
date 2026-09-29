package com.anthony.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CourseDTO(
        Long id,

        @NotBlank(message = "O nome do curso é obrigatório")
        @Size(max = 50, message = "O nome do curso deve ter no máximo 50 caracteres")
        String name,

        @NotBlank(message = "A categoria é obrigatória")
        String category
) {
}