package com.eventos.infrastructure.adapters.output.persistence;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.eventos.model.Event;
import com.eventos.model.QRCode;
import com.eventos.model.Student;

public interface QRCodeJpaRepository extends JpaRepository<QRCode, UUID> {

    @Query("SELECT q FROM QRCode q WHERE q.student = :student AND q.event = :event ORDER BY q.expirationDate DESC")
    List<QRCode> findByStudentAndEvent(
        @Param("student") Student student,
        @Param("event") Event event
    );
    
}
