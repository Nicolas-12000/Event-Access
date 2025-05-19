package com.eventos.infrastructure.adapters.controllers;

import com.eventos.application.ports.input.EventInputPort;
import com.eventos.infrastructure.adapters.controllers.dto.EventRequest;
import com.eventos.infrastructure.adapters.controllers.dto.EventResponse;
import com.eventos.infrastructure.mappers.EventMapper;
import com.eventos.model.Event;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventInputPort eventInputPort;
    private final EventMapper eventMapper;

    @PostMapping
    @Transactional
    public ResponseEntity<EventResponse> createEvent(@Valid @RequestBody EventRequest eventRequest) {
        Event event = eventMapper.toDomain(eventRequest);
        Event createdEvent = eventInputPort.createEvent(event);
        return ResponseEntity.status(HttpStatus.CREATED)
                           .body(eventMapper.toResponse(createdEvent));
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<EventResponse> getEventById(@PathVariable Long eventId) {
        Event event = eventInputPort.getEventById(eventId);
        return ResponseEntity.ok(eventMapper.toResponse(event));
    }


    @GetMapping("/name/{name}")
    public ResponseEntity<EventResponse> getEventByName(@PathVariable String name) {
        Event event = eventInputPort.getEventByName(name);
        return ResponseEntity.ok(eventMapper.toResponse(event));
    }

    @GetMapping
    public ResponseEntity<List<EventResponse>> getAllEvents() {
        List<Event> events = eventInputPort.getAllEvents();
        if (events.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<EventResponse> eventResponses = events.stream()
                                                 .map(eventMapper::toResponse)
                                                 .collect(Collectors.toList());
        return ResponseEntity.ok(eventResponses);
    }

    @PutMapping("/{eventId}")
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public ResponseEntity<EventResponse> updateEvent(
            @PathVariable Long eventId, 
            @Valid @RequestBody EventRequest eventRequest) {
        eventInputPort.getEventById(eventId);

        Event eventToUpdate = eventMapper.toDomain(eventRequest);
        eventToUpdate.setEventId(eventId);

        Event updatedEvent = eventInputPort.updateEvent(eventToUpdate);
        return ResponseEntity.ok(eventMapper.toResponse(updatedEvent));
    }

    @PutMapping("/{eventId}/sessions")
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public ResponseEntity<EventResponse> addSessions(
            @PathVariable Long eventId,
            @RequestParam int sessions) {
        eventInputPort.addSessionToEvent(eventId, sessions);
        return ResponseEntity.ok(
                eventMapper.toResponse(eventInputPort.getEventById(eventId))
        );
    }

    @DeleteMapping("/{eventId}")
    @Transactional
    public ResponseEntity<Void> deleteEvent(@PathVariable Long eventId) {
        eventInputPort.deleteEvent(eventId);
        return ResponseEntity.noContent().build();
    }
}