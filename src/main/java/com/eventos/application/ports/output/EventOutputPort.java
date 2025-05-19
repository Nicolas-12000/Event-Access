package com.eventos.application.ports.output;

import java.util.List;
import java.util.Optional;

import com.eventos.model.Event;

public interface EventOutputPort {
    Event saveEvent(Event event);
    Optional<Event> getEventById(Long eventId);
    void deleteEvent(Long eventId);
    Event addSessions(Long eventId, int sessions);
    Optional<Event> getEventByName(String name);
    List<Event> getAllEvents();
}
