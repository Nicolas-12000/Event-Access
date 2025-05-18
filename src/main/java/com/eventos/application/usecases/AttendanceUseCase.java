package com.eventos.application.usecases;

import java.util.UUID;
import java.util.List;
import org.springframework.stereotype.Service;
import com.eventos.application.ports.input.AttendanceInputPort;
import com.eventos.application.ports.output.AttendanceOutputPort;
import com.eventos.application.ports.output.QRCodeOutputPort;
import com.eventos.model.Event;
import com.eventos.model.Attendance;
import com.eventos.model.QRCode;


import jakarta.transaction.Transactional;

@Service
public class AttendanceUseCase implements AttendanceInputPort {

    private final AttendanceOutputPort attendanceOutputPort;
    private final QRCodeOutputPort qrCodeOutputPort;

    public AttendanceUseCase(AttendanceOutputPort attendanceOutputPort, 
                            QRCodeOutputPort qrCodeOutputPort) {
        this.attendanceOutputPort = attendanceOutputPort;
        this.qrCodeOutputPort = qrCodeOutputPort;
    }

    @Override
    @Transactional
    public Attendance registerAttendance(UUID qrId, int sessionNumber) {
        QRCode qrCode = qrCodeOutputPort.getQRCodeById(qrId)
            .orElseThrow(() -> new IllegalArgumentException("QR no encontrado: " + qrId));

        if (attendanceOutputPort.existsByQRId(qrId.toString(), sessionNumber)) {
            throw new IllegalArgumentException("Asistencia ya registrada para esta sesión");
        }
        
        Attendance attendance = new Attendance();
        attendance.setQrCode(qrCode);
        attendance.setStudent(qrCode.getStudent());
        attendance.setEvent(qrCode.getEvent());
        attendance.setNumberOfSessions(sessionNumber);
        
        validateSessionNumber(attendance);
        
        return attendanceOutputPort.saveAttendance(attendance);
    }

    private void validateSessionNumber(Attendance attendance) {
        Event event = attendance.getEvent();
        if (attendance.getNumberOfSessions() < 1 || 
            attendance.getNumberOfSessions() > event.getNumberOfSessions()) {
            throw new IllegalArgumentException("Número de sesión inválido para el evento: " 
                + event.getName());
        }
    }

    @Override
    public List<Attendance> getAttendancesByStudentId(String identityDocument) {
        return attendanceOutputPort.findByStudentId(identityDocument);
    }

    @Override
    public List<Attendance> getAttendancesByEventId(Long eventId) {
        return attendanceOutputPort.findByEventId(eventId);
    }
}
