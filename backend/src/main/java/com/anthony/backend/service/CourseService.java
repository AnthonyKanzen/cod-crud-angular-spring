package com.anthony.backend.service;

import com.anthony.backend.dto.CourseDTO;
import com.anthony.backend.exception.RecordNotFoundException;
import com.anthony.backend.mapper.CourseMapper;
import com.anthony.backend.model.Course;
import com.anthony.backend.repository.CourseRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    public List<CourseDTO> list() {
        return courseRepository.findAll()
                .stream()
                .map(CourseMapper::toDTO)
                .toList();
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
        course.setCategory(courseDTO.category());

        Course updatedCourse = courseRepository.save(course);
        return CourseMapper.toDTO(updatedCourse);
    }

    public void delete(Long id) {
        courseRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id));

        courseRepository.deleteById(id);
    }
}