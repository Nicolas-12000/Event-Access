package com.eventos.application.ports.output;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.eventos.model.Event;
import com.eventos.model.QRCode;
import com.eventos.model.Student;

public interface QRCodeOutputPort {
    QRCode saveQRCode(QRCode qrCode);
    Optional<QRCode> getQRCodeById(UUID qrId);
    List<QRCode> getAllByStudentAndEvent(Student student, Event event);
    Optional<QRCode> findLastestByStudent(Student student);
    QRCode deleteQRCode(UUID qrCode);

}
