package com.anthony.backend.enums.converters;

import com.anthony.backend.enums.CourseStatus;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.Arrays;

@Converter
public class StatusConverters implements AttributeConverter<CourseStatus, String> {

    @Override
    public String convertToDatabaseColumn(CourseStatus status) {
        return status != null ? status.getValue() : null;
    }

    @Override
    public CourseStatus convertToEntityAttribute(String value) {
        if (value == null) {
            return null;
        }

        return Arrays.stream(CourseStatus.values())
                .filter(status -> status.getValue().equals(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Status inválido: " + value));
    }
}