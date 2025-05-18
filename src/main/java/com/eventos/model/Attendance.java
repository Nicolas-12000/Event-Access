package com.eventos.model;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Min;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.FetchType;

@Entity
@Getter
@Setter
@Table(name="attendances", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"event_id", "identity_document","number_of_sessions, qr_code_id"})
})
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attendanceId;

    @ManyToOne
    @JoinColumn(name = "qr_code_id", nullable = false)
    private QRCode qrCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = " identity_document", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @Min(value = 1, message = "El número no puede ser menor a 1")
    @Column(name = "number_of_sessions", nullable = false)
    private int numberOfSessions;

    @Column(name = "registration_time", nullable = false)
    private LocalDateTime registrationTime = LocalDateTime.now();

    @PrePersist
    @PreUpdate
    public void validateSession(){
        if (numberOfSessions > event.getNumberOfSessions()) {
            throw new IllegalArgumentException("Número de sesión excede las permitidas para este evento");
        }
    }


    
}
