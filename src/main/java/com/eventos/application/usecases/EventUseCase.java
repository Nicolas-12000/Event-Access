package com.eventos.application.usecases;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.eventos.application.ports.input.EventInputPort;
import com.eventos.application.ports.output.EventOutputPort;
import com.eventos.model.Event;

@Service
public class EventUseCase implements EventInputPort{

    private final EventOutputPort eventOutputPort;
    
    public EventUseCase(EventOutputPort eventOutputPort) {
        this.eventOutputPort = eventOutputPort;
    }

    @Override
    public Event createEvent(Event event){
        eventOutputPort.getEventByName(event.getName())
            .ifPresent(e -> {
                throw new IllegalArgumentException("Evento con este nombre ya existe");
            });
        return eventOutputPort.saveEvent(event);
    }

    @Override
    public Event getEventByName(String eventName) {
        return eventOutputPort.getEventByName(eventName)
            .orElseThrow(() -> new NoSuchElementException("EventO no encontrado:" + eventName));
    }

    @Override
    public void addSessionToEvent(Long eventId, int numberOfSessions) {
        Event event = getEventById(eventId);
        event.setNumberOfSessions(event.getNumberOfSessions() + numberOfSessions);
        eventOutputPort.saveEvent(event);
    }

    @Override
    public Event getEventById(Long eventId) {
        return eventOutputPort.getEventById(eventId)
            .orElseThrow(() -> new NoSuchElementException("Event no encontrado CON ID:" + eventId));
    }

    @Override
    public Event updateEvent(Event event) {
        getEventById(event.getEventId());
        return eventOutputPort.saveEvent(event);
    }

    @Override
    public void deleteEvent(Long eventId) {
        Event event = getEventById(eventId);
        eventOutputPort.deleteEvent(event.getEventId());
    }

    @Override
    public void deleteEventByName(String eventName) {
        Event event = getEventByName(eventName);
        eventOutputPort.deleteEvent(event.getEventId());
    }

    @Override
    public List<Event> getAllEvents() {
        return eventOutputPort.getAllEvents();
    }
}