package com.eventos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;
import com.eventos.model.*;
import com.eventos.repository.*;

@Controller
@RequestMapping("/registrations")
public class RegistrationController {

    @Autowired
    private RegistrationRepository registrationRepository;
    
    @Autowired
    private EventRepository eventRepository;
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private EventDataRepository eventDataRepository;

    @PostMapping("/add")
    public @ResponseBody String addRegistration(
            @RequestParam UUID eventId,
            @RequestParam String studentId,
            @RequestParam(required = false) Long eventDataId) {
        
        Registration registration = new Registration();
        registration.setEvent(eventRepository.findById(eventId).orElseThrow());
        registration.setStudent(studentRepository.findById(studentId).orElseThrow());
        
        if(eventDataId != null) {
            registration.setTimeEvent(eventDataRepository.findById(eventDataId).orElseThrow());
        }
        
        registrationRepository.save(registration);
        return "Registro guardado";
    }

    @GetMapping("/all")
    public @ResponseBody Iterable<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }
}