package com.eventos.application.usecases;

import org.springframework.stereotype.Service;

import com.eventos.application.ports.output.EmailServiceOutputPort;
import com.eventos.application.ports.output.QRCodeOutputPort;
import com.eventos.application.ports.output.StudentOutputPort;
import com.eventos.model.Student;
import com.eventos.model.QRCode;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailUseCase {

    private final EmailServiceOutputPort emailServiceOutputPort;
    private final QRCodeOutputPort qrCodeOutputPort;
    private final StudentOutputPort studentOutputPort;

    @Transactional
    public void sendQrToStudent(String studentId) {
        Student student = studentOutputPort.getStudentById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("Estudiante no encontrado con ID: " + studentId));

        validateStudent(student);

        QRCode qrCode = qrCodeOutputPort.findLastestByStudent(student)
                .orElseThrow(() -> new IllegalArgumentException("QR Code no encontrado para el estudiante: " + studentId));
        
        emailServiceOutputPort.sendEmailWithQRImage(
            student.getEmail(),
            "Tu Código QR para Asistencias - " + qrCode.getEvent().getName(),
            buildEmailContent(student, qrCode),
            qrCode.getQrImage()
        );
    }

    private void validateStudent(Student student) {
        if (student.getEmail() == null || student.getEmail().isBlank()) {
            throw new IllegalArgumentException("El estudiante " + student.getIdentityDocument() + " no tiene email registrado");
        }
    }

    private String buildEmailContent(Student student, QRCode qrCode) {
        return String.format("""
            <html>
                <body style="font-family: Arial, sans-serif;">
                    <h2 style="color: #2c3e50;">¡Hola %s!</h2>
                    <p>Adjuntamos tu código QR para el evento: <strong>%s</strong></p>
                    <p><strong>Detalles importantes:</strong></p>
                    <ul>
                        <li>Válido hasta: %s</li>
                        <li>Sesiones permitidas: %d</li>
                        <li>Documento: %s</li>
                    </ul>
                    <p style="color: #e74c3c;">⚠️ Este QR es personal e intransferible</p>
                </body>
            </html>
            """,
            student.getName(),
            student.getLastName(),
            qrCode.getEvent().getName(),
            qrCode.getExpirationDate(),
            qrCode.getEvent().getNumberOfSessions(),
            student.getIdentityDocument()
        );
    }
}
