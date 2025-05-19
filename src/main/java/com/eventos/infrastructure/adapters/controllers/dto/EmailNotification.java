package com.eventos.infrastructure.adapters.controllers.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.Map;

public record EmailNotification(
    @NotBlank String to,
    @NotBlank String subject,
    String templateId,
    Map<String, Object> dynamiData
) {
    
}
