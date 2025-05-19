package com.eventos.infrastructure.adapters.output.persistence;

import com.eventos.application.ports.output.EventOutputPort;
import com.eventos.model.Event;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class EventPersistenceAdapter implements EventOutputPort {

    private final EventJpaRepository eventRepository;

    @Override
    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public Optional<Event> getEventById(Long eventId) {
        return eventRepository.findById(eventId);
    }

    @Override
    public Optional<Event> getEventByName(String name) {
        return eventRepository.findByName(name);
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public void deleteEvent(Long eventId) {
        eventRepository.deleteById(eventId);
    }

    @Override
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public Event addSessions(Long eventId, int sessions) {
        Event event = eventRepository.findByIdWithLock(eventId)
            .orElseThrow(() -> new NoSuchElementException("Evento no encontrado: " + eventId));
        event.setNumberOfSessions(event.getNumberOfSessions() + sessions);
        return eventRepository.save(event);
    }
}
