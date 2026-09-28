package com.anthony.backend.service;

import com.anthony.backend.exception.RecordNotFoundException;
import com.anthony.backend.model.Course;
import com.anthony.backend.repository.CourseRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    public List<Course> list() {
        return courseRepository.findAll();
    }

    public Course create(Course course) {
        return courseRepository.save(course);
    }

    public Course findById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id));
    }

    public Course update(Long id, Course course) {
        courseRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id));

        course.setId(id);
        return courseRepository.save(course);
    }

    public void delete(Long id) {
        courseRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id));

        courseRepository.deleteById(id);
    }
}