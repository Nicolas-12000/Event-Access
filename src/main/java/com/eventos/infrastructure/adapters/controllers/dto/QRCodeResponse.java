package com.eventos.infrastructure.adapters.controllers.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record QRCodeResponse(
    UUID qrId,
    String eventName,
    LocalDateTime expirationDate
) {}
