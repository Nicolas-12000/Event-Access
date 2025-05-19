package com.eventos.infrastructure.adapters.controllers;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventos.application.ports.input.ReportInputPort;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@Validated
public class ReportController {

    private static final Logger log = LoggerFactory.getLogger(ReportController.class);
    private final ReportInputPort reportInputPort;

    @GetMapping("/event/{eventId}")
    public ResponseEntity<byte[]> generateEventReport(@PathVariable @NotNull (message = "El ID del evento no puede ser nulo") @Positive(message = "El ID del evento debe ser positivo") Long eventId) {
        log.info("Solicitud para generar reporte de evento con ID: {}", eventId);
        byte[] report = reportInputPort.generateReportForEvent(eventId);

        if (report == null || report.length == 0) {
            log.warn("Reporte generado para evento ID: {} está vacío o es nulo.", eventId);
            return ResponseEntity.noContent().build();
        }

        String filename = "reporte_evento_" + eventId + ".xlsx";
        
        log.info("Reporte generado exitosamente para evento ID: {}. Nombre de archivo: {}", eventId, filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(report);
    }
}
