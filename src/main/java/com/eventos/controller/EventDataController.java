package com.eventos.controller;

import com.eventos.model.EventData;
import com.eventos.repository.EventDataRepository;
import com.eventos.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/event-data")
public class EventDataController {

    @Autowired
    private EventDataRepository eventDataRepository;

    @Autowired
    private EventRepository eventRepository;

    // CREATE
    @PostMapping
    public ResponseEntity<?> createEventData(@RequestBody EventData eventData) { // Usar<?>
        // Validación de Clave Foránea (Evento)
        if (eventData.getEvent() == null || eventData.getEvent().getEventId() == null) {
             return ResponseEntity.badRequest().body("Event ID es requerido.");
        }
        Long eventId = eventData.getEvent().getEventId();
        if (!eventRepository.existsById(eventId)) {
            return ResponseEntity.badRequest().body("Evento con ID " + eventId + " no encontrado.");
        }

        try {
            eventData.setAttendanceCount(0);
            EventData savedEventData = eventDataRepository.save(eventData);
            return new ResponseEntity<>(savedEventData, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
             return ResponseEntity.status(HttpStatus.CONFLICT)
                     .body("Error creating event data: " + e.getMessage());
        }
        catch (Exception e) {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                     .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    // READ ALL
    @GetMapping
    public List<EventData> getAllEventData() {
        return eventDataRepository.findAll();
    }

    // READ ONE
    @GetMapping("/{id}")
    public ResponseEntity<EventData> getEventDataById(@PathVariable Long id) {
        return eventDataRepository.findById(id)
                .map(data -> new ResponseEntity<>(data, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEventData(@PathVariable Long id, @RequestBody EventData eventDataDetails) { // Usar<?>
        Optional<EventData> existingDataOpt = eventDataRepository.findById(id);

        if (existingDataOpt.isPresent()) {
            EventData existingData = existingDataOpt.get();

            // Validar si se intenta cambiar el evento (generalmente no se debería via PUT simple)
            if (eventDataDetails.getEvent() != null && eventDataDetails.getEvent().getEventId() != null &&
                !eventDataDetails.getEvent().getEventId().equals(existingData.getEvent().getEventId())) {
                 return ResponseEntity.badRequest().body("Changing the associated Event is not supported via this endpoint.");
            }

            existingData.setStartDate(eventDataDetails.getStartDate());
            existingData.setStartTime(eventDataDetails.getStartTime());
            existingData.setEndDate(eventDataDetails.getEndDate());
            existingData.setEndTime(eventDataDetails.getEndTime());
            existingData.setDescription(eventDataDetails.getDescription());
            // AttendanceCount no se actualiza aquí normalmente

            try {
                EventData updatedData = eventDataRepository.save(existingData);
                return new ResponseEntity<>(updatedData, HttpStatus.OK);
            } catch (DataIntegrityViolationException e) {
                 return ResponseEntity.status(HttpStatus.CONFLICT)
                         .body("Error updating event data: " + e.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("An unexpected error occurred during update: " + e.getMessage());
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteEventData(@PathVariable Long id) {
        try {
            if (eventDataRepository.existsById(id)) {
                // Considerar impacto en Registrations si no hay CASCADE
                eventDataRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (DataIntegrityViolationException e) {
             // Si esta EventData está referenciada en Registrations
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}