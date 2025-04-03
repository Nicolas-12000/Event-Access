package com.eventos.repository;

import com.eventos.model.EventData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface EventDataRepository extends JpaRepository<EventData, Long> {
    List<EventData> findByEvent_EventId(Long eventId);

}