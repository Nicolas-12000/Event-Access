package com.eventos.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor

@Table(name="student")
public class Student {
    @Id
    @Column(unique = true, nullable = false)
    private String identityDocument;

    @NotBlank
    private String name;

    @NotBlank
    private String lastName;

    @Email
    @Column(unique = true, nullable = false)
    private String email;

    private String documentType;
    private String code;
    private String address;
    private String phoneNumber; 
    
}
