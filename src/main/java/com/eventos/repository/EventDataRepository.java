package com.eventos.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.eventos.model.EventData;

@Repository
public interface EventDataRepository extends CrudRepository<EventData, Long> {

}