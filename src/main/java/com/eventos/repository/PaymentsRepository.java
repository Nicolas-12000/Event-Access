package com.eventos.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.eventos.model.PaymentId;
import com.eventos.model.Payments;

@Repository
public interface PaymentsRepository extends CrudRepository<Payments, PaymentId> {
}

