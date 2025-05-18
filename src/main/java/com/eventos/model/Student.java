package com.eventos.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Getter
@Setter
@NoArgsConstructor

@Table(name="student")
public class Student {
    @Id
    @Column(name = "identity_document", unique = true)
    private String identityDocument;

    @NotBlank
    @Size(min = 3, max = 50)
    @Column(nullable = false)
    private String name;

    @NotBlank
    @Size(min = 3, max = 50)
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Email
    @Column(unique = true)
    private String email;

    private String documentType;

    @Pattern(regexp = "^[0-9]{1,2}$", message = "Semester must be a number between 1 and 12")
    @Column(nullable = false)
    private String semester;
    private String universityId;
    private String address;

    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Phone number must be between 10 and 15 digits")
    private String phoneNumber;

    
    
    public Student(String identityDocument, String name, String lastName, String email, String documentType, String semester, String universityId, String address, String phoneNumber) {
        this.identityDocument = identityDocument;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.documentType = documentType;
        this.semester = semester;
        this.universityId = universityId;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
    
}