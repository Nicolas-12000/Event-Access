package com.eventos.infrastructure.adapters.output.persistence;

import com.eventos.application.ports.output.AttendanceOutputPort;
import com.eventos.model.Attendance;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class AttendancePersistenceAdapter implements AttendanceOutputPort {

    private final AttendanceRepository attendanceRepository;

    @Override
    public Attendance saveAttendance(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    @Override
    public boolean existsByQRId(UUID qrId, int sessionNumber) {
        return attendanceRepository.existsByQrCode_QrIdAndNumberOfSessions(qrId, sessionNumber);
    }

    @Override
    public List<Attendance> findByStudentId(String identityDocument) {
        return attendanceRepository.findByStudent_IdentityDocument(identityDocument);
    }

    @Override
    public List<Attendance> findByEventId(Long eventId) {
        return attendanceRepository.findByEvent_EventId(eventId);
    }
}