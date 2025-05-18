package com.eventos.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.GenerationType;

@Entity
@Getter
@Setter
@Table(name="admins")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adminId;

    @NotBlank
    @Size(min = 5, max = 30)
    @Column(unique = true, nullable = false)
    private String username;

    @NotBlank
    @Size(min = 8)
    @Column(nullable = false)
    private String password;
    
}
