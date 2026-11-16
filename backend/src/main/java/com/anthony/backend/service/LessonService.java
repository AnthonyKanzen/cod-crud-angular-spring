
package com.anthony.backend.service;

import com.anthony.backend.dto.LessonDTO;
import com.anthony.backend.exception.RecordNotFoundException;
import com.anthony.backend.model.Course;
import com.anthony.backend.model.Lesson;
import com.anthony.backend.repository.CourseRepository;
import com.anthony.backend.repository.LessonRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LessonService {

    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;

    public LessonDTO create(Long courseId, LessonDTO lessonDTO) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RecordNotFoundException(courseId));

        Lesson lesson = new Lesson();
        lesson.setName(lessonDTO.name());
        lesson.setYoutubeUrl(lessonDTO.youtubeUrl());
        lesson.setCourse(course);

        Lesson savedLesson = lessonRepository.save(lesson);

        return new LessonDTO(
                savedLesson.getId(),
                savedLesson.getName(),
                savedLesson.getYoutubeUrl()
        );
    }

    public LessonDTO update(Long courseId, Long lessonId, LessonDTO lessonDTO) {
        Lesson lesson = lessonRepository.findByIdAndCourse_Id(lessonId, courseId)
                .orElseThrow(() -> new RecordNotFoundException(lessonId));

        lesson.setName(lessonDTO.name());
        lesson.setYoutubeUrl(lessonDTO.youtubeUrl());

        Lesson updatedLesson = lessonRepository.save(lesson);

        return new LessonDTO(
                updatedLesson.getId(),
                updatedLesson.getName(),
                updatedLesson.getYoutubeUrl()
        );
    }
}
