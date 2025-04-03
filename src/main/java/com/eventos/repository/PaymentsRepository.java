package com.eventos.repository;

import com.eventos.model.PaymentId;
import com.eventos.model.Payments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentsRepository extends JpaRepository<Payments, PaymentId> {
    List<Payments> findById_Event_EventId(Long eventId);

    List<Payments> findById_IdentityDocument(String identityDocument);

    List<Payments> findByPaymentStatus(Boolean paymentStatus);
}