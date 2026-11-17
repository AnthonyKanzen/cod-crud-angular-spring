
package com.anthony.backend.service;

import com.anthony.backend.dto.CourseDTO;
import com.anthony.backend.dto.PageDTO;
import com.anthony.backend.exception.RecordNotFoundException;
import com.anthony.backend.mapper.CourseMapper;
import com.anthony.backend.model.Course;
import com.anthony.backend.model.Lesson;
import com.anthony.backend.repository.CourseRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    public PageDTO<CourseDTO> list(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Course> coursePage = courseRepository.findAll(pageable);

        List<CourseDTO> content = coursePage.getContent()
                .stream()
                .map(CourseMapper::toDTO)
                .toList();

        return new PageDTO<>(
                content,
                coursePage.getNumber(),
                coursePage.getSize(),
                coursePage.getTotalElements(),
                coursePage.getTotalPages()
        );
    }

    public CourseDTO create(CourseDTO courseDTO) {
        Course course = CourseMapper.toEntity(courseDTO);
        Course savedCourse = courseRepository.save(course);
        return CourseMapper.toDTO(savedCourse);
    }

    public CourseDTO findById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id));

        return CourseMapper.toDTO(course);
    }

    public CourseDTO update(Long id, CourseDTO courseDTO) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id));

        course.setName(courseDTO.name());
        course.setCategory(CourseMapper.toCategory(courseDTO.category()));

        if (courseDTO.lessons() != null) {
            course.getLessons().clear();

            courseDTO.lessons().forEach(lessonDTO -> {
                Lesson lesson = new Lesson();
                lesson.setName(lessonDTO.name());
                lesson.setYoutubeUrl(lessonDTO.youtubeUrl());
                lesson.setCourse(course);
                course.getLessons().add(lesson);
            });
        }

        Course updatedCourse = courseRepository.save(course);
        return CourseMapper.toDTO(updatedCourse);
    }

    public void delete(Long id) {
        courseRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id));

        courseRepository.deleteById(id);
    }
}
