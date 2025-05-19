package com.eventos.infrastructure.adapters.controllers.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record StudentRequest(
    @NotBlank String identityDocument,
    @NotBlank String name,
    @NotBlank String lastName,
    @Email String email,
    String documentType,
    @Pattern(regexp = "^[0-9]{1,2}$", message = "Semester must be a number between 1 and 12") String semester,
    String universityId,
    String address,
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Phone number must be between 10 and 15 digits") String phoneNumber
) {}
