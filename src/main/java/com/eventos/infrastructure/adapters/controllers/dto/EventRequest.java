package com.eventos.infrastructure.adapters.controllers.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record EventRequest(
    @NotBlank String name,
    @Positive int numberOfSessions,
    String place,
    String description,
    @FutureOrPresent LocalDate startDate,
    @FutureOrPresent LocalDate endDate
) {
    
}
