package com.eventos.infrastructure.mappers;

import org.springframework.stereotype.Component;

import com.eventos.infrastructure.adapters.controllers.dto.StudentRequest;
import com.eventos.infrastructure.adapters.controllers.dto.StudentResponse;
import com.eventos.model.Student;

@Component
public class StudentMapper {
    public Student toDomain(StudentRequest request) {
        return Student.builder()
                    .identityDocument(request.identityDocument())
                    .name(request.name())
                    .lastName(request.lastName())
                    .email(request.email())
                    .documentType(request.documentType())
                    .semester(request.semester())
                    .universityId(request.universityId())
                    .address(request.address())
                    .phoneNumber(request.phoneNumber())
                    .build();
    }

    public StudentResponse toResponse(Student student) {
        return new StudentResponse(
            student.getIdentityDocument(),
            student.getName(),
            student.getLastName(),
            student.getEmail(),
            student.getUniversityId(),
            student.getSemester()
        );
    }
}
