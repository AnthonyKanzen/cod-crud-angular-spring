
package com.anthony.backend.controller;

import com.anthony.backend.dto.LessonDTO;
import com.anthony.backend.service.LessonService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courses/{courseId}/lessons")
@AllArgsConstructor
public class LessonController {

    private final LessonService lessonService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LessonDTO create(
            @PathVariable Long courseId,
            @RequestBody LessonDTO lessonDTO) {
        return lessonService.create(courseId, lessonDTO);
    }

    @PutMapping("/{lessonId}")
    @ResponseStatus(HttpStatus.OK)
    public LessonDTO update(
            @PathVariable Long courseId,
            @PathVariable Long lessonId,
            @RequestBody LessonDTO lessonDTO) {
        return lessonService.update(courseId, lessonId, lessonDTO);
    }
}
