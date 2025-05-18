package com.eventos.application.ports.output;

import java.util.List;

import com.eventos.model.Attendance;

public interface AttendanceOutputPort {
    Attendance saveAttendance(Attendance attendance);
    boolean existsByQRId(String qrCode, int sessionNumber);
    List<Attendance> findByEventId (Long eventId);
    List<Attendance> findByStudentId (String identityDocument);
}
