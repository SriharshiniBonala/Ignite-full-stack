package com.ignite.MentorShip.repository;

import com.ignite.MentorShip.entity.MentorRating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MentorRatingRepository extends JpaRepository<MentorRating,Long> {

    List<MentorRating> findByMentorId(Long mentorId);
}