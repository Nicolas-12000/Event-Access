package com.eventos.controller;

import com.eventos.model.Registration;
import com.eventos.repository.EventDataRepository;
import com.eventos.repository.EventRepository;
import com.eventos.repository.RegistrationRepository;
import com.eventos.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    @Autowired private RegistrationRepository registrationRepository;
    @Autowired private EventRepository eventRepository;
    @Autowired private StudentRepository studentRepository;
    @Autowired private EventDataRepository eventDataRepository;

    // CREATE
    @PostMapping
    public ResponseEntity<?> createRegistration(@RequestBody Registration registration) { // Usar<?>

        // --- Validaciones de Claves Foráneas ---
        // Evento
        if (registration.getEvent() == null || registration.getEvent().getEventId() == null) {
            return ResponseEntity.badRequest().body("Event ID is required for registration.");
        }
        Long eventId = registration.getEvent().getEventId();
        if (!eventRepository.existsById(eventId)) {
            return ResponseEntity.badRequest().body("Event with ID " + eventId + " not found.");
        }

        // Estudiante
        if (registration.getStudent() == null || registration.getStudent().getIdentityDocument() == null) {
            return ResponseEntity.badRequest().body("Student Identity Document is required for registration.");
        }
        String studentId = registration.getStudent().getIdentityDocument();
        if (!studentRepository.existsById(studentId)) {
            return ResponseEntity.badRequest().body("Student with Identity Document " + studentId + " not found.");
        }

        // EventData (Opcional)
        if (registration.getTimeEvent() != null && registration.getTimeEvent().getId() != null) {
            Long eventDataId = registration.getTimeEvent().getId();
            if (!eventDataRepository.existsById(eventDataId)) {
                 return ResponseEntity.badRequest().body("EventData (TimeEvent) with ID " + eventDataId + " not found.");
            }
        }
        // --- Fin Validaciones ---

        try {
            Registration savedRegistration = registrationRepository.save(registration);
            return new ResponseEntity<>(savedRegistration, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
             // Podría ser una constraint única (e.g., mismo estudiante registrado 2 veces al mismo evento?)
             return ResponseEntity.status(HttpStatus.CONFLICT)
                     .body("Error creating registration: Possible duplicate registration or data conflict. " + e.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                     .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    // READ ALL
    @GetMapping
    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }

    // READ ONE
    @GetMapping("/{id}")
    public ResponseEntity<Registration> getRegistrationById(@PathVariable UUID id) {
        return registrationRepository.findById(id)
                .map(reg -> new ResponseEntity<>(reg, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<?> updateRegistration(@PathVariable UUID id, @RequestBody Registration registrationDetails) { // Usar<?>
        Optional<Registration> registrationData = registrationRepository.findById(id);

        if (registrationData.isPresent()) {
            Registration existingRegistration = registrationData.get();

            // Validar si se intenta cambiar Event o Student (No permitido usualmente)
             if (registrationDetails.getEvent() != null && registrationDetails.getEvent().getEventId() != null &&
                !registrationDetails.getEvent().getEventId().equals(existingRegistration.getEvent().getEventId())) {
                 return ResponseEntity.badRequest().body("Changing the associated Event is not supported.");
             }
             if (registrationDetails.getStudent() != null && registrationDetails.getStudent().getIdentityDocument() != null &&
                !registrationDetails.getStudent().getIdentityDocument().equals(existingRegistration.getStudent().getIdentityDocument())) {
                 return ResponseEntity.badRequest().body("Changing the associated Student is not supported.");
             }


            // Permitir cambiar timeEvent (validando si existe)
            if (registrationDetails.getTimeEvent() != null && registrationDetails.getTimeEvent().getId() != null) {
                 Long eventDataId = registrationDetails.getTimeEvent().getId();
                 if (!eventDataRepository.existsById(eventDataId)) {
                     return ResponseEntity.badRequest().body("EventData (TimeEvent) with ID " + eventDataId + " not found.");
                 }
                 // Aquí también podrías validar que el EventData pertenece al Evento correcto si es necesario
                 existingRegistration.setTimeEvent(registrationDetails.getTimeEvent());
            } else {
                 // Permitir desasignar horario
                 existingRegistration.setTimeEvent(null);
            }

            try {
                 Registration updatedRegistration = registrationRepository.save(existingRegistration);
                return new ResponseEntity<>(updatedRegistration, HttpStatus.OK);
            } catch (DataIntegrityViolationException e) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Error updating registration: " + e.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("An unexpected error occurred during update: " + e.getMessage());
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteRegistration(@PathVariable UUID id) {
        try {
            if (registrationRepository.existsById(id)) {
                registrationRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
             // DataIntegrityViolationException podría ocurrir si algo depende del registro, aunque es menos común
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}