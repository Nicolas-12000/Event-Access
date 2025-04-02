package com.eventos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.eventos.model.*;
import com.eventos.repository.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Controller
@RequestMapping("/events-data")
public class EventDataController {

    @Autowired
    private EventDataRepository eventDataRepository;
    
    @Autowired
    private EventRepository eventRepository;

    @PostMapping("/add")
    public @ResponseBody String addEventData(
            @RequestBody UUID eventId,
            @RequestBody LocalDate startDate,
            @RequestBody LocalTime starTime,
            @RequestBody LocalTime endTime,
            @RequestBody LocalDate endDate,
            @RequestBody (required = false) String description) {
        
        EventData eventData = new EventData();
        eventData.setEvent(eventRepository.findById(eventId).orElseThrow());
        eventData.setStartDate(startDate);
        eventData.setStarTime(starTime);
        eventData.setEndTime(endTime);
        eventData.setEndDate(endDate);
        eventData.setDescription(description);
        
        eventDataRepository.save(eventData);
        return "Event Data Saved";
    }

    @PostMapping("/increment-attendance/{id}")
    public @ResponseBody String incrementAttendance(@PathVariable Long id) {
        EventData eventData = eventDataRepository.findById(id).orElseThrow();
        eventData.incrementAttendance();
        eventDataRepository.save(eventData);
        return "Attendance Incremented";
    }

    @GetMapping("/all")
    public @ResponseBody Iterable<EventData> getAllEventData() {
        return eventDataRepository.findAll();
    }
}