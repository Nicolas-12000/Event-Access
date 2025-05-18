package com.eventos.application.ports.input;

import java.util.UUID;
import java.util.List;

import com.eventos.model.Attendance;

public interface AttendanceInputPort {
    Attendance registerAttendance(UUID qrId, int sessionNumber);
    List<Attendance> getAttendancesByStudentId(String identityDocument);
    List<Attendance> getAttendancesByEventId(Long eventId);
}
