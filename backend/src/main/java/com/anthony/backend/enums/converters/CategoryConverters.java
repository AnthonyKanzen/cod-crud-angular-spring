package com.anthony.backend.enums.converters;

import com.anthony.backend.enums.Category;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.Arrays;

@Converter(autoApply = true)
public class CategoryConverters implements AttributeConverter<Category, String> {

    @Override
    public String convertToDatabaseColumn(Category category) {
        return category != null ? category.getValue() : null;
    }

    @Override
    public Category convertToEntityAttribute(String value) {
        if (value == null) {
            return null;
        }

        return Arrays.stream(Category.values())
                .filter(category -> category.getValue().equals(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Categoria inválida: " + value));
    }
}