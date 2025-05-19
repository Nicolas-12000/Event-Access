package com.eventos.model;



import jakarta.persistence.Column;
import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.AllArgsConstructor;

@Entity
@Builder
@Getter
@Setter
@ToString
@AllArgsConstructor

@Table (name="events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventId;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 50 caracteres")
    @Column(nullable = false, length = 100)
    private String name;

    @Positive(message = "Debe tener al menos una sesión")
    @Column(name = "number_of_sessions", nullable = false)
    private int numberOfSessions;

    @Size(max = 200, message = "El lugar no puede exceder los 200 caracteres")
    private String place;

    @Size(max = 500, message = "La descripción no puede exceder los 500 caracteres")
    private String description;

    @FutureOrPresent(message = "La fecha de inicio debe ser en el futuro o presente")
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @FutureOrPresent(message = "La fecha de finalización debe ser en el futuro o presente")
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    protected Event() {
    }

    public Event(String name, Integer numberOfSessions, LocalDate startDate) {
        this.name = name;
        this.numberOfSessions = numberOfSessions;
        this.startDate = startDate;
    }


}
