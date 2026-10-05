package com.anthony.backend.enums;

public enum CourseStatus {

    ATIVO("Ativo"),
    INATIVO("Inativo");

    private String value;

    CourseStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return value;
    }
}