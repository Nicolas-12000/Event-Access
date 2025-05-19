package com.eventos.infrastructure.mappers;

import org.springframework.stereotype.Component;

import com.eventos.infrastructure.adapters.controllers.dto.QRCodeResponse;
import com.eventos.model.QRCode;

@Component
public class QRCodeMapper {

    public QRCodeResponse toResponse(QRCode qrCode) {
        return new QRCodeResponse(
            qrCode.getQrId(),
            qrCode.getEvent().getName(),
            qrCode.getExpirationDate()
        );
    }
    
}
