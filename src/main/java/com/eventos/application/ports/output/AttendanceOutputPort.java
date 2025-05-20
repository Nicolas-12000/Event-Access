package com.eventos.application.ports.output;

import java.util.List;
import java.util.UUID;

import com.eventos.model.Attendance;

public interface AttendanceOutputPort {
    Attendance saveAttendance(Attendance attendance);
    boolean existsByQRId(UUID qrCode, int sessionNumber);
    List<Attendance> findByEventId (Long eventId);
    List<Attendance> findByStudentId (String identityDocument);
}
