package com.eventos.infrastructure.adapters.output.persistence;

import com.eventos.model.QRCode;
import com.eventos.model.Event;
import com.eventos.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface QRCodeRepository extends JpaRepository<QRCode, UUID> {
    List<QRCode> findAllByStudentAndEvent(Student student, Event event);
    Optional<QRCode> findTopByStudentOrderByCreatedAtDesc(Student student);
}