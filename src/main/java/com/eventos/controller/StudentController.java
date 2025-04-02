package com.eventos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.eventos.model.Student;
import com.eventos.repository.StudentRepository;

@Controller
@RequestMapping(path = "/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping(path = "/add")
    public @ResponseBody String addStudent(
            @RequestParam String identityDocument,
            @RequestParam String name,
            @RequestParam String lastName,
            @RequestParam String email,
            @RequestParam(required = false) String documentType,
            @RequestParam(required = false) String code,
            @RequestParam(required = false) String address,
            @RequestParam(required = false) String phoneNumber) {

        Student student = new Student();
        student.setIdentityDocument(identityDocument);
        student.setName(name);
        student.setLastName(lastName);
        student.setEmail(email);
        student.setDocumentType(documentType);
        student.setCode(code);
        student.setAddress(address);
        student.setPhoneNumber(phoneNumber);

        studentRepository.save(student);
        return "Estudiante registrado";
    }

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}