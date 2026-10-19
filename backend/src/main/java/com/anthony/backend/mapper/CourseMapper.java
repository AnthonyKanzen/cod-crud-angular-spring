
package com.anthony.backend.mapper;

import com.anthony.backend.dto.CourseDTO;
import com.anthony.backend.dto.LessonDTO;
import com.anthony.backend.enums.CourseStatus;
import com.anthony.backend.model.Course;

public class CourseMapper {

    public static CourseDTO toDTO(Course course) {
        return new CourseDTO(
                course.getId(),
                course.getName(),
                course.getCategory(),
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
        course.setCategory(dto.category());
        course.setStatus(CourseStatus.ATIVO);
        return course;
    }
}