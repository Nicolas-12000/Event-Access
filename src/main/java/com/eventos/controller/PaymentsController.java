package com.eventos.controller;

import com.eventos.model.Event;
import com.eventos.model.PaymentId;
import com.eventos.model.Payments;
import com.eventos.repository.EventRepository;
import com.eventos.repository.PaymentsRepository;
import com.eventos.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payments")
public class PaymentsController {

    @Autowired private PaymentsRepository paymentsRepository;
    @Autowired private EventRepository eventRepository;
    @Autowired private StudentRepository studentRepository;

    // CREATE
    @PostMapping
    public ResponseEntity<?> createPayment(@RequestBody Payments payment) { // Usar<?>

        // --- Validaciones de Clave Compuesta ---
        if (payment.getId() == null || payment.getId().getEvent() == null || payment.getId().getEvent().getEventId() == null) {
             return ResponseEntity.badRequest().body("Event ID is required within the payment ID.");
        }
         if (payment.getId().getIdentityDocument() == null || payment.getId().getIdentityDocument().trim().isEmpty()) {
             return ResponseEntity.badRequest().body("Student Identity Document is required within the payment ID.");
         }

        Long eventId = payment.getId().getEvent().getEventId();
        String studentId = payment.getId().getIdentityDocument();

        if (!eventRepository.existsById(eventId)) {
            return ResponseEntity.badRequest().body("Event with ID " + eventId + " not found.");
        }
        if (!studentRepository.existsById(studentId)) {
            return ResponseEntity.badRequest().body("Student with Identity Document " + studentId + " not found.");
        }
        // --- Fin Validaciones ---

        try {
            // Asegurarse que el objeto Event dentro de PaymentId solo tenga el ID
            // para evitar problemas de detached entity si se envió más info.
            Event eventRef = new Event();
            eventRef.setEventId(eventId);
            payment.getId().setEvent(eventRef);

            Payments savedPayment = paymentsRepository.save(payment);
            return new ResponseEntity<>(savedPayment, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // Error principal aquí sería clave primaria duplicada (mismo evento y estudiante)
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Error creating payment: Payment for this event and student may already exist. " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    // READ ALL
    @GetMapping
    public List<Payments> getAllPayments() {
        return paymentsRepository.findAll();
    }

    // READ ONE
    @GetMapping("/event/{eventId}/student/{identityDocument}")
    public ResponseEntity<Payments> getPaymentById(@PathVariable Long eventId, @PathVariable String identityDocument) {
        PaymentId paymentId = buildPaymentId(eventId, identityDocument);
        return paymentsRepository.findById(paymentId)
                .map(payment -> new ResponseEntity<>(payment, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // UPDATE
    @PutMapping("/event/{eventId}/student/{identityDocument}")
    public ResponseEntity<?> updatePayment(@PathVariable Long eventId,
                                           @PathVariable String identityDocument,
                                           @RequestBody Payments paymentDetails) { // Usar<?>
        PaymentId paymentId = buildPaymentId(eventId, identityDocument);
        Optional<Payments> existingPaymentOpt = paymentsRepository.findById(paymentId);

        if (existingPaymentOpt.isPresent()) {
            Payments existingPayment = existingPaymentOpt.get();
            existingPayment.setPaymentStatus(paymentDetails.getPaymentStatus());
            existingPayment.setDescription(paymentDetails.getDescription());
            try {
                Payments updatedPayment = paymentsRepository.save(existingPayment);
                return new ResponseEntity<>(updatedPayment, HttpStatus.OK);
            } catch (DataIntegrityViolationException e) {
                 // Menos probable aquí a menos que haya otras constraints
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Error updating payment: " + e.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                         .body("An unexpected error occurred during update: " + e.getMessage());
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE
    @DeleteMapping("/event/{eventId}/student/{identityDocument}")
    public ResponseEntity<HttpStatus> deletePayment(@PathVariable Long eventId, @PathVariable String identityDocument) {
        PaymentId paymentId = buildPaymentId(eventId, identityDocument);
        try {
            if (paymentsRepository.existsById(paymentId)) {
                paymentsRepository.deleteById(paymentId);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            // Podría haber problemas si algo más depende del pago, aunque es raro
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Helper method to build PaymentId
    private PaymentId buildPaymentId(Long eventId, String identityDocument) {
         PaymentId paymentId = new PaymentId();
         Event eventRef = new Event();
         eventRef.setEventId(eventId);
         paymentId.setEvent(eventRef);
         paymentId.setIdentityDocument(identityDocument);
         return paymentId;
    }
}