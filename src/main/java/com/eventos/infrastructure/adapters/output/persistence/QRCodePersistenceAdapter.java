package com.eventos.infrastructure.adapters.output.persistence;

import com.eventos.application.ports.output.QRCodeOutputPort;
import com.eventos.model.Event;
import com.eventos.model.QRCode;
import com.eventos.model.Student;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Component
@RequiredArgsConstructor
public class QRCodePersistenceAdapter implements QRCodeOutputPort {

    private final QRCodeRepository qrCodeRepository;

    @Override
    public QRCode saveQRCode(QRCode qrCode) {
        return qrCodeRepository.save(qrCode);
    }

    @Override
    public Optional<QRCode> getQRCodeById(UUID qrId) {
        return qrCodeRepository.findById(qrId);
    }

    @Override
    public List<QRCode> getAllByStudentAndEvent(Student student, Event event) {
        return qrCodeRepository.findAllByStudentAndEvent(student, event);
    }

    @Override
    public Optional<QRCode> findLastestByStudent(Student student) {
        return qrCodeRepository.findTopByStudentOrderByCreatedAtDesc(student);
    }

    @Override
    public QRCode deleteQRCode(UUID qrId) {
        Optional<QRCode> qrCode = qrCodeRepository.findById(qrId);
        qrCode.ifPresent(qrCodeRepository::delete);
        return qrCode.orElse(null);
    }
}
