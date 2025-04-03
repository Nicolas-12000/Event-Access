package com.eventos.controller;

import com.eventos.model.Student;
import com.eventos.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    // CREATE
    @PostMapping
    public ResponseEntity<?> createStudent(@RequestBody Student student) { 
        try {
            // Validación adicional podría ir aquí (aunque @NotBlank/@Email ya ayudan)
            Student savedStudent = studentRepository.save(student);
            return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // Error común si se viola una constraint UNIQUE (e.g., email duplicado)
            return ResponseEntity.status(HttpStatus.CONFLICT) // 409 Conflict es más específico
                    .body("Error creating student: Possible duplicate email or identity document. " + e.getMessage());
        } catch (Exception e) {
            // Captura genérica para otros errores inesperados
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    // READ ALL
    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // READ ONE
    @GetMapping("/{identityDocument}")
    public ResponseEntity<Student> getStudentById(@PathVariable String identityDocument) {
        return studentRepository.findById(identityDocument)
                .map(student -> new ResponseEntity<>(student, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // UPDATE
    @PutMapping("/{identityDocument}")
    public ResponseEntity<?> updateStudent(@PathVariable String identityDocument, @RequestBody Student studentDetails) { // Usar<?>
        Optional<Student> studentData = studentRepository.findById(identityDocument);

        if (studentData.isPresent()) {
            Student existingStudent = studentData.get();
            existingStudent.setName(studentDetails.getName());
            existingStudent.setLastName(studentDetails.getLastName());
            existingStudent.setEmail(studentDetails.getEmail());
            existingStudent.setDocumentType(studentDetails.getDocumentType());
            existingStudent.setCode(studentDetails.getCode());
            existingStudent.setAddress(studentDetails.getAddress());
            existingStudent.setPhoneNumber(studentDetails.getPhoneNumber());
            try {
                Student updatedStudent = studentRepository.save(existingStudent);
                return new ResponseEntity<>(updatedStudent, HttpStatus.OK);
            } catch (DataIntegrityViolationException e) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Error updating student: Possible duplicate email. " + e.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                         .body("An unexpected error occurred during update: " + e.getMessage());
            }
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }

    // DELETE
    @DeleteMapping("/{identityDocument}")
    public ResponseEntity<HttpStatus> deleteStudent(@PathVariable String identityDocument) {
        try {
            if (studentRepository.existsById(identityDocument)) {
                studentRepository.deleteById(identityDocument);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found
            }
        } catch (DataIntegrityViolationException e) {
             // Si el estudiante está referenciado en otras tablas (registros, pagos) y no hay CASCADE DELETE
            return new ResponseEntity<>(HttpStatus.CONFLICT); // 409 Conflict
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}