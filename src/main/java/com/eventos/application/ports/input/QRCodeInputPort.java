package com.eventos.application.ports.input;

import com.eventos.model.QRCode;

public interface QRCodeInputPort {
    QRCode generateQRForStudentsAndEvent(String identityDocument, Long eventId);
    boolean validateQRCode(String qrCode);
    QRCode getQRCodeById(String qrCode);
}
