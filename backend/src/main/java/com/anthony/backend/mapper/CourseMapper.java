
package com.anthony.backend.mapper;

import com.anthony.backend.dto.CourseDTO;
import com.anthony.backend.dto.LessonDTO;
import com.anthony.backend.enums.Category;
import com.anthony.backend.enums.CourseStatus;
import com.anthony.backend.model.Course;
import com.anthony.backend.model.Lesson;

import java.util.ArrayList;
import java.util.Arrays;

public class CourseMapper {

    public static CourseDTO toDTO(Course course) {
        return new CourseDTO(
                course.getId(),
                course.getName(),
                course.getCategory() != null ? course.getCategory().getValue() : null,
                course.getLessons().stream()
                        .map(lesson -> new LessonDTO(
                                lesson.getId(),
                                lesson.getName(),
                                lesson.getYoutubeUrl()
                        ))
                        .toList()
        );
    }

    public static Course toEntity(CourseDTO dto) {
        Course course = new Course();
        course.setId(dto.id());
        course.setName(dto.name());
        course.setCategory(toCategory(dto.category()));
        course.setStatus(CourseStatus.ATIVO);
        course.setLessons(new ArrayList<>());

        if (dto.lessons() != null) {
            dto.lessons().forEach(lessonDTO -> {
                Lesson lesson = new Lesson();
                lesson.setName(lessonDTO.name());
                lesson.setYoutubeUrl(lessonDTO.youtubeUrl());
                lesson.setCourse(course);
                course.getLessons().add(lesson);
            });
        }

        return course;
    }

    public static Category toCategory(String value) {
        return Arrays.stream(Category.values())
                .filter(category -> category.name().equals(value)
                        || category.getValue().equals(value))
                .findFirst()
                .orElse(null);
    }
}
