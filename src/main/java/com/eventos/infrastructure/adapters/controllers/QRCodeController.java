package com.eventos.infrastructure.adapters.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.transaction.annotation.Transactional;

import com.eventos.application.ports.input.QRCodeInputPort;
import com.eventos.infrastructure.adapters.controllers.dto.QRCodeResponse;
import com.eventos.infrastructure.mappers.QRCodeMapper;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.util.UUID;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/qr_codes")
@RequiredArgsConstructor
@Validated
public class QRCodeController {

    private static final Logger log = LoggerFactory.getLogger(QRCodeController.class);
    private final QRCodeInputPort qrCodeInputPort;
    private final QRCodeMapper qrCodeMapper;

    @PostMapping("/generate")
    @Transactional
    public ResponseEntity<QRCodeResponse> generateQR(
        @RequestParam @NotBlank(message = "El ID del estudiante no puede estar vacío") String identityDocument,
        @RequestParam @NotNull(message = "El ID del evento no puede ser nulo") 
        @Positive(message = "El ID del evento debe ser positivo") Long eventId) {
        
        log.info("Solicitud para generar QR para estudiante: {} y evento: {}", identityDocument, eventId);
        QRCodeResponse qrCodeResponse = qrCodeMapper.toResponse(
            qrCodeInputPort.generateQRForStudentsAndEvent(identityDocument, eventId)
        );
        return new ResponseEntity<>(qrCodeResponse, HttpStatus.CREATED);
    }

    @PostMapping("/validate/{qrId}")
    @Transactional
    public ResponseEntity<Void> validateQR(@PathVariable UUID qrId) {
        log.info("Solicitud para validar QR con ID: {}", qrId);
        
        try {
            boolean isValid = qrCodeInputPort.validateQRCode(qrId);
            if (isValid) {
                log.info("QR ID: {} validado exitosamente.", qrId);
                return ResponseEntity.ok().build(); 
            } else {
                log.warn("Validación fallida para QR ID: {} (estado de conflicto).", qrId);
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
        } catch (Exception e) { 
            log.error("Error durante la validación del QR ID: {}", qrId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @DeleteMapping("/{qrId}")
    @Transactional
    public ResponseEntity<Void> deleteQR(@PathVariable UUID qrId) {
        log.info("Solicitud para eliminar QR con ID: {}", qrId);
        try {
            qrCodeInputPort.deleteQRCode(qrId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Error al eliminar QR ID: {}", qrId, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
