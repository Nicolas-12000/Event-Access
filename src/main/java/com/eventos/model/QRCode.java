package com.eventos.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.GeneratedValue;

@Entity
@Getter
@Setter
@Table(name="qr_codes", uniqueConstraints = @UniqueConstraint(columnNames = {"event_id", "identity_document"}))
public class QRCode {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID qrId;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @ManyToOne
    @JoinColumn(name = "identity_document", nullable = false)
    private Student student;

    @Lob
    @Column(nullable = false)
    private byte[] qrImage;

    @Column(name = "is_used", nullable = false)
    private boolean isUsed;

    @Column(name = "expiration_date", nullable = false)
    private LocalDateTime expirationDate;

    
}
