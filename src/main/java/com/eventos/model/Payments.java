package com.eventos.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data

@Table(name="payments")
public class Payments {
    @EmbeddedId
    private PaymentId id;

    private Boolean paymentStatus;
    private String description;
}
