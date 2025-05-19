package com.eventos.infrastructure.adapters.output.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import com.eventos.model.Student;

import jakarta.persistence.LockModeType;

public interface StudentJpaRepository extends JpaRepository <Student, String> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM Student s WHERE s.identityDocument = :identityDocument")
    Optional<Student> findByIdWithLock(String identityDocument);  
}
