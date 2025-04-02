package com.eventos.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor


public class EventData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "event_id",nullable = false)
    private Event event;

    @Column(nullable = false)
    private int attendanceCount = 0;
    
    public void incrementAttendance() {
        this.attendanceCount++;
    }

    private LocalDate startDate;
    private LocalTime starTime;
    private LocalTime endTime;
    private LocalDate endDate; 
    private String description;
}
