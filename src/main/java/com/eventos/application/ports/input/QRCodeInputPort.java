package com.eventos.application.ports.input;

import com.eventos.model.QRCode;
import java.util.UUID;

public interface QRCodeInputPort {
    QRCode generateQRForStudentsAndEvent(String identityDocument, Long eventId);
    boolean validateQRCode(UUID qrCode);
    QRCode getQRCodeById(UUID qrCode);
    QRCode deleteQRCode(UUID qrCode);
}
