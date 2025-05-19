package com.eventos.infrastructure.adapters.output.persistence;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import com.eventos.application.ports.output.StudentOutputPort;
import com.eventos.model.Student;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class StudentPersistenceAdapter implements StudentOutputPort {

    private final StudentJpaRepository studentRepository;

    @Override
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public Optional<Student> getStudentById(String identityDocument) {
        return studentRepository.findById(identityDocument);
    }

    @Override
    public boolean existsById(String identityDocument) {
        return studentRepository.existsById(identityDocument);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student deleteStudent(String identityDocument) {
        Student student = studentRepository.findById(identityDocument)
            .orElseThrow(() -> new NoSuchElementException("Estudiante no encontrado: " + identityDocument));
        studentRepository.deleteById(identityDocument);
        return student;
    }

    @Override
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public Student updateStudent(String identityDocument, Student student) {
        Student existing = studentRepository.findByIdWithLock(identityDocument)
            .orElseThrow(() -> new NoSuchElementException("Estudiante no encontrado: " + identityDocument));
        existing.setName(student.getName());
        existing.setLastName(student.getLastName());
        existing.setEmail(student.getEmail());
        return studentRepository.save(existing);
    }
}