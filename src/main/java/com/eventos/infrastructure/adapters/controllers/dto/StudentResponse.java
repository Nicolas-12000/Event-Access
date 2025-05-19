package com.eventos.infrastructure.adapters.controllers.dto;

public record StudentResponse(
    String identityDocument,
    String name,
    String lastName,
    String email,
    String semester,
    String universityId
) {}
