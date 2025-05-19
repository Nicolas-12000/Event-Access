package com.eventos.infrastructure.adapters.controllers.dto;

import java.time.LocalDateTime;

public record AttendanceResponse(
    String studentName,
    String studentLastName,
    String eventName,
    int sessionAttended,
    LocalDateTime lastAttendanceTime
) {}
