package com.eventos.infrastructure.adapters.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.eventos.application.usecases.EmailUseCase;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/api/emails")
@RequiredArgsConstructor
@Validated
public class EmailController {

    private static final Logger log = LoggerFactory.getLogger(EmailController.class);
    private final EmailUseCase emailUseCase;

    @PostMapping("/send-qr/{identityDocument}")
    @Transactional
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void sendQrEmail(@PathVariable @NotBlank(message = "El ID del estudiante no puede estar vacío") String identityDocument){
         log.info("Solicitud para enviar email con QR al estudiante ID: {}", identityDocument);
        try {
            emailUseCase.sendQrToStudent(identityDocument);
            log.info("Solicitud de envío de email para estudiante ID: {} aceptada.", identityDocument);
        } catch (Exception e) {

            log.error("Error al procesar la solicitud de envío de email para estudiante ID: {}", identityDocument, e);
            throw e;
        }
    }
}
