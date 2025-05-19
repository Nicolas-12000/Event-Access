package com.eventos.infrastructure.adapters.controllers.dto;

import java.time.LocalDate;

public record EventResponse(
    Long eventId,
    String name,
    String place,
    LocalDate startDate,
    LocalDate endDate,
    int numberOfSessions
) {}
