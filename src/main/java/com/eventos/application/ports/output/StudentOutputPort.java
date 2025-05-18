package com.eventos.application.ports.output;

import java.util.Optional;
import java.util.List;

import com.eventos.model.Student;

public interface StudentOutputPort {
    Student saveStudent(Student student);
    Optional<Student> getStudentById(String identityDocument);
    boolean existsById(String identityDocument);
    List<Student> getAllStudents();
    

}
