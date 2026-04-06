package com.ignite.MentorShip.repository;

import com.ignite.MentorShip.entity.MentorRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface MentorRequestRepository extends JpaRepository<MentorRequest, Long> {

    // ✅ ADD THIS: To find all requests made by a specific student
    List<MentorRequest> findByStudentId(Long studentId);

    List<MentorRequest> findByMentorId(Long mentorId);

    @Query("SELECT r FROM MentorRequest r LEFT JOIN FETCH r.student LEFT JOIN FETCH r.project WHERE r.mentor.id = :mentorId")
    List<MentorRequest> findByMentorIdWithDetails(@Param("mentorId") Long mentorId);
}