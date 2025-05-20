package com.eventos.application.ports.input;

import java.util.List;

import com.eventos.model.Event;

public interface EventInputPort {
    Event createEvent(Event event);
    Event getEventByName(String eventName);
    void addSessionToEvent(Long eventId, int numberOfSessions);
    Event getEventById(Long eventId);
    Event updateEvent(Event event);
    void deleteEvent(Long eventId);
    List<Event> getAllEvents();
    void deleteEventByName(String eventName);

}
