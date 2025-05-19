package com.eventos.infrastructure.adapters.output.persistence;

import com.eventos.model.Event;

import jakarta.persistence.LockModeType;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

public interface EventJpaRepository extends JpaRepository<Event, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT e FROM Event e WHERE e.eventId = :eventId")
    Optional<Event> findByIdWithLock(Long eventId);
    Optional<Event> findByName(String name);

    
}
