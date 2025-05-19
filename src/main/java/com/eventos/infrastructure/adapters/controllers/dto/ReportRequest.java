package com.eventos.infrastructure.adapters.controllers.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.PastOrPresent;

public record ReportRequest(
    Long eventId,
    @PastOrPresent LocalDate startDate,
    @PastOrPresent LocalDate endDate
) {
    
}
