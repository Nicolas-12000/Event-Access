package com.eventos.application.usecases;

import com.eventos.application.ports.input.QRCodeInputPort;
import com.eventos.application.ports.output.EventOutputPort;
import com.eventos.application.ports.output.QRCodeOutputPort;
import com.eventos.application.ports.output.StudentOutputPort;
import com.eventos.model.Event;
import com.eventos.model.QRCode;
import com.eventos.model.Student;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class QRCodeUseCase implements QRCodeInputPort {

    private static final int QR_CODE_SIZE = 300;
    
    private final QRCodeOutputPort qrCodeOutputPort;
    private final StudentOutputPort studentOutputPort;
    private final EventOutputPort eventOutputPort;

    public QRCodeUseCase(QRCodeOutputPort qrCodeOutputPort,
                        StudentOutputPort studentOutputPort,
                        EventOutputPort eventOutputPort) {
        this.qrCodeOutputPort = qrCodeOutputPort;
        this.studentOutputPort = studentOutputPort;
        this.eventOutputPort = eventOutputPort;
    }

    @Override
    @Transactional
    public QRCode generateQRForStudentsAndEvent(String identityDocument, Long eventId) {
        Student student = studentOutputPort.getStudentById(identityDocument)
                .orElseThrow(() -> new IllegalArgumentException(identityDocument));
        
        Event event = eventOutputPort.getEventById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Evento no encontrado con ID: " + eventId));

        checkExistingQRCodes(student, event);
        
        QRCode qrCode = new QRCode();
        qrCode.setEvent(event);
        qrCode.setStudent(student);
        qrCode.setQrImage(generateQRImage(student, event));
        qrCode.setExpirationDate(event.getEndDate().atTime(23, 59).plusHours(24));
        qrCode.setUsed(false);

        return qrCodeOutputPort.saveQRCode(qrCode);
    }

    private void checkExistingQRCodes(Student student, Event event) {
        if (!qrCodeOutputPort.getAllByStudentAndEvent(student, event).isEmpty()) {
            throw new IllegalArgumentException(
                "Ya existe un QR para el estudiante: " + student.getIdentityDocument() +
                " en el evento: " + event.getName()
            );
        }
    }

    private byte[] generateQRImage(Student student, Event event) {
        try {
            String qrContent = String.format(
                "Evento: %s|Estudiante: %s|UUID: %s",
                event.getEventId(),
                student.getIdentityDocument(),
                UUID.randomUUID()
            );
            
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(
                qrContent,
                BarcodeFormat.QR_CODE,
                QR_CODE_SIZE,
                QR_CODE_SIZE
            );
            
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);
            return outputStream.toByteArray();
            
        } catch (WriterException | IOException e) {
            throw new IllegalArgumentException("Error generando código QR: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public boolean validateQRCode(UUID qrCode) {
        QRCode code = qrCodeOutputPort.getQRCodeById(qrCode)
                .orElseThrow(() -> new IllegalArgumentException("QR no válido"));
        
        if (LocalDateTime.now().isAfter(code.getExpirationDate())) {
            throw new IllegalArgumentException("QR expirado");
        }
        
        code.setUsed(true);
        qrCodeOutputPort.saveQRCode(code);
        return true;
    }

    @Override
    public QRCode getQRCodeById(UUID qrCode) {
        return qrCodeOutputPort.getQRCodeById(qrCode)
                .orElseThrow(() -> new IllegalArgumentException(qrCode.toString()));
    }

    @Override
    @Transactional
    public QRCode deleteQRCode(UUID qrCode) {
        qrCodeOutputPort.getQRCodeById(qrCode)
            .orElseThrow(() -> new IllegalArgumentException("QR no encontrado"));
        return qrCodeOutputPort.deleteQRCode(qrCode);
}
}