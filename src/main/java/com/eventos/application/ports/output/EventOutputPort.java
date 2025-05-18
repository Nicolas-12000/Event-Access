package com.eventos.application.ports.output;

import java.util.Optional;

import com.eventos.model.Event;

public interface EventOutputPort {
    Event saveEvent(Event event);
    Optional<Event> getEventByName(String eventName);
    Optional<Event> getEventById(Long eventId);
    void deleteEvent(Long eventId);

}
