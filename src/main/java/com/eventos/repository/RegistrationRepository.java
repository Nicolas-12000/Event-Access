package com.eventos.repository;

import com.eventos.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, UUID> {
    List<Registration> findByEvent_EventId(Long eventId);

    List<Registration> findByStudent_IdentityDocument(String identityDocument);

    List<Registration> findByTimeEvent_Id(Long eventDataId);

}