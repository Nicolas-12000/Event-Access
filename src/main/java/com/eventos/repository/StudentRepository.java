package com.eventos.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.eventos.model.Student;

@Repository
public interface StudentRepository extends CrudRepository<Student, String> {
}
