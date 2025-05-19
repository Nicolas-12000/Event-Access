package com.eventos.infrastructure.mappers;

import org.springframework.stereotype.Component;

import com.eventos.infrastructure.adapters.controllers.dto.EventRequest;
import com.eventos.infrastructure.adapters.controllers.dto.EventResponse;
import com.eventos.model.Event;


@Component
public class EventMapper {

    public Event toDomain(EventRequest request) {
        return Event.builder()
                .name(request.name())
                .numberOfSessions(request.numberOfSessions())
                .place(request.place())
                .description(request.description())
                .startDate(request.startDate())
                .endDate(request.endDate())
                .build();
    }

    public EventResponse toResponse(Event event) {
        if (event == null) {
            return null;
        }
        return new EventResponse(
                event.getEventId(),
                event.getName(),
                event.getPlace(),
                event.getStartDate(),
                event.getEndDate(),
                event.getNumberOfSessions()
        );
    }
}
