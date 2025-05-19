package com.eventos.infrastructure.mappers;

import org.springframework.stereotype.Component;

import com.eventos.infrastructure.adapters.controllers.dto.ReportRequest;
import com.eventos.model.Event;

@Component
public class ReportMapper {
    
    public Event toEventCriteria(ReportRequest request){
        return Event.builder()
                .eventId(request.eventId())
                .startDate(request.startDate())
                .endDate(request.endDate())
                .build();
    }
}
