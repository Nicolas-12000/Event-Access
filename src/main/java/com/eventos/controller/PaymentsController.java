package com.eventos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.eventos.model.*;
import com.eventos.repository.*;
import java.util.UUID;

@Controller
@RequestMapping("/payments")
public class PaymentsController {

    @Autowired
    private PaymentsRepository paymentsRepository;
    
    @Autowired
    private EventRepository eventRepository;

    @PostMapping("/add")
    public @ResponseBody String addPayment(
            @RequestParam UUID eventId,
            @RequestParam String identityDocument,
            @RequestParam Boolean paymentStatus,
            @RequestParam(required = false) String description) {
        
        Payments payment = new Payments();
        PaymentId paymentId = new PaymentId();
        
        paymentId.setEvent(eventRepository.findById(eventId).orElseThrow());
        paymentId.setIdentityDocument(identityDocument);
        
        payment.setId(paymentId);
        payment.setPaymentStatus(paymentStatus);
        payment.setDescription(description);
        
        paymentsRepository.save(payment);
        return "Payment registrado";
    }

    @GetMapping("/all")
    public @ResponseBody Iterable<Payments> getAllPayments() {
        return paymentsRepository.findAll();
    }
}