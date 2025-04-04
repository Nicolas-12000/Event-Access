package com.eventos.controller;

import com.eventos.model.Event;
import com.eventos.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    // CREATE
    @PostMapping
    public ResponseEntity<?> createEvent(@RequestBody Event event) { // Usar<?>
        try {
            // validaciones de negocio si fueran necesarias
            Event savedEvent = eventRepository.save(event);
            return new ResponseEntity<>(savedEvent, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
             // Por si hubiera constraints únicas en el nombre o algo similar
             return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Error creating event: " + e.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    // READ ALL
    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // READ ONE
    @GetMapping("/{eventId}")
    public ResponseEntity<Event> getEventById(@PathVariable Long eventId) {
        return eventRepository.findById(eventId)
                .map(event -> new ResponseEntity<>(event, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // UPDATE
    @PutMapping("/{eventId}")
    public ResponseEntity<?> updateEvent(@PathVariable Long eventId, @RequestBody Event eventDetails) { // Usar<?>
        Optional<Event> eventData = eventRepository.findById(eventId);

        if (eventData.isPresent()) {
            Event existingEvent = eventData.get();
            existingEvent.setName(eventDetails.getName());
            existingEvent.setPlace(eventDetails.getPlace());
            existingEvent.setDescription(eventDetails.getDescription());
            try {
                Event updatedEvent = eventRepository.save(existingEvent);
                return new ResponseEntity<>(updatedEvent, HttpStatus.OK);
            } catch (DataIntegrityViolationException e) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Error updating event: " + e.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("An unexpected error occurred during update: " + e.getMessage());
            }
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }

    // DELETE
    @DeleteMapping("/{eventId}")
    public ResponseEntity<HttpStatus> deleteEvent(@PathVariable Long eventId) {
        try {
            if (eventRepository.existsById(eventId)) {
                // Considerar el impacto en EventData, Registrations, Payments si no hay CASCADE
                eventRepository.deleteById(eventId);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (DataIntegrityViolationException e) {
             // Si el evento está referenciado en otras tablas
            return new ResponseEntity<>(HttpStatus.CONFLICT); // 409 Conflict
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}