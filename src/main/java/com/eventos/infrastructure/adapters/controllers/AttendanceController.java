package com.eventos.infrastructure.adapters.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import com.eventos.application.ports.input.AttendanceInputPort;
import com.eventos.infrastructure.adapters.controllers.dto.AttendanceRequest;
import com.eventos.infrastructure.adapters.controllers.dto.AttendanceResponse;
import com.eventos.infrastructure.mappers.AttendanceMapper;

import lombok.RequiredArgsConstructor;
import java.util.List;

@RestController
@RequestMapping("/api/attendances")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceInputPort attendanceInputPort;
    private final AttendanceMapper attendanceMapper;

    @PostMapping
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public ResponseEntity<AttendanceResponse> registerAttendance(
            @Valid @RequestBody AttendanceRequest request) {
        return ResponseEntity.ok(attendanceMapper.toResponse(
            attendanceInputPort.registerAttendance(request.qrCodeId(), request.NumberOfSessions())
        ));
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<AttendanceResponse>> getByEvent(@PathVariable Long eventId) {
        List<AttendanceResponse> responses = attendanceInputPort.getAttendancesByEventId(eventId)
                .stream()
                .map(attendanceMapper::toResponse)
                .toList();
        
        return responses.isEmpty() ? 
               ResponseEntity.noContent().build() : 
               ResponseEntity.ok(responses);
    }

    @GetMapping("/student/{identityDocument}")
    public ResponseEntity<List<AttendanceResponse>> getByStudent(@PathVariable String identityDocument) {
        List<AttendanceResponse> responses = attendanceInputPort.getAttendancesByStudentId(identityDocument)
                .stream()
                .map(attendanceMapper::toResponse)
                .toList();
        
        return responses.isEmpty() ? 
               ResponseEntity.noContent().build() : 
               ResponseEntity.ok(responses);
    }
}
