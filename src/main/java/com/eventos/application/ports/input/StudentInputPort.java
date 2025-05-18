package com.eventos.application.ports.input;

import com.eventos.model.Student;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

public interface StudentInputPort {
    List<Student> uploadStudentsFromExcel(InputStream excelFile) throws IOException;
    Student createStudent(Student student );
    Optional<Student> getStudentById(String identityDocument);
    List<Student> getAllStudents();
    void updateStudent(String identityDocument, Student student);
}
