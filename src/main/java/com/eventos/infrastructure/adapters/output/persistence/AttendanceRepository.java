package com.eventos.infrastructure.adapters.output.persistence;

import com.eventos.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    boolean existsByQrCode_QrIdAndNumberOfSessions(UUID qrId, int sessionNumber);
    List<Attendance> findByStudent_IdentityDocument(String identityDocument);
    List<Attendance> findByEvent_EventId(Long eventId);
}