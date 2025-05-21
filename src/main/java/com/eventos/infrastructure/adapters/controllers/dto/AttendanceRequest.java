package com.eventos.infrastructure.adapters.controllers.dto;

import java.util.UUID;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record AttendanceRequest(
    @NotBlank UUID qrCodeId,
    @Min(1) int NumberOfSessions
) {}
