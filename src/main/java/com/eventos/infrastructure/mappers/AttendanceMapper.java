package com.eventos.infrastructure.mappers;


import org.springframework.stereotype.Component;

import com.eventos.infrastructure.adapters.controllers.dto.AttendanceRequest;
import com.eventos.infrastructure.adapters.controllers.dto.AttendanceResponse;
import com.eventos.model.Attendance;
import com.eventos.model.QRCode;

@Component
public class AttendanceMapper {

    public Attendance toDomain(AttendanceRequest request, QRCode qrCode) {
        return Attendance.builder()
                .qrCode(qrCode)
                .numberOfSessions(request.sessionNumber())
                .build();
    }

    public AttendanceRequest toRequest(Attendance attendance) {
        return new AttendanceRequest(
            attendance.getQrCode().getQrId(),
            attendance.getNumberOfSessions()
        );
    }
    
    public AttendanceResponse toResponse(Attendance attendance) {
        return new AttendanceResponse(
            attendance.getStudent().getName(),
            attendance.getStudent().getLastName(),
            attendance.getEvent().getName(),
            attendance.getNumberOfSessions(),
            attendance.getRegistrationTime()
        );
    }
}
