package com.eventos.model;

import jakarta.persistence.*;
import java.io.Serializable;
import lombok.Data;

@Data
@Embeddable
public class PaymentId implements Serializable {
    
    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;
    
    @Column(name = "identity_document", nullable = false)
    private String identityDocument;
}
