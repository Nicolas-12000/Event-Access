package com.eventos.infrastructure.adapters.output.persistence;

import com.eventos.model.Attendance;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AttendanceJpaRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findByStudentIdentityDocument(String identityDocument);
    List<Attendance> findByEventEventId(Long eventId);
    
}
