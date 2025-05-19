package com.eventos.infrastructure.adapters.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventos.application.ports.input.StudentInputPort;
import com.eventos.infrastructure.adapters.controllers.dto.StudentRequest;
import com.eventos.infrastructure.adapters.controllers.dto.StudentResponse;
import com.eventos.infrastructure.mappers.StudentMapper;
import com.eventos.model.Student;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentInputPort studentInputPort;
    private final StudentMapper studentMapper;

    @GetMapping("/{identityDocument}")
    public ResponseEntity<StudentResponse> getStudent(@PathVariable String identityDocument) {
        return studentInputPort.getStudentById(identityDocument)
            .map(student -> ResponseEntity.ok(studentMapper.toResponse(student)))
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<StudentResponse> createStudent(@Valid @RequestBody StudentRequest request) {
        Student student = studentMapper.toDomain(request);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(studentMapper.toResponse(studentInputPort.createStudent(student)));
    }

    @PutMapping("/{identityDocument}")
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public ResponseEntity<StudentResponse> updateStudent(
            @PathVariable String identityDocument,
            @Valid @RequestBody StudentRequest request) {
        Student student = studentMapper.toDomain(request);
        student.setIdentityDocument(identityDocument);
        
        return studentInputPort.getStudentById(identityDocument)
            .map(existingStudent -> {
                studentInputPort.updateStudent(identityDocument, student);
                return ResponseEntity.ok(studentMapper.toResponse(student));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{identityDocument}")
    public ResponseEntity<Void> deleteStudent(@PathVariable String identityDocument) {
        return studentInputPort.getStudentById(identityDocument)
            .map(student -> {
                studentInputPort.removeStudent(identityDocument);
                return ResponseEntity.noContent().<Void>build();
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
