package com.eventos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.eventos.model.*;
import com.eventos.repository.*;

@Controller
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @PostMapping("/add")
    public @ResponseBody String addEvent(
            @RequestBody String name,
            @RequestBody(required = false) String place,
            @RequestBody(required = false) String description) {
        
        Event event = new Event();
        event.setName(name);
        event.setPlace(place);
        event.setDescription(description);
        eventRepository.save(event);
        return "Evento guardado";
    }

    @GetMapping("/all")
    public @ResponseBody Iterable<Event> getAllEvents() {
        return eventRepository.findAll();
    }
}