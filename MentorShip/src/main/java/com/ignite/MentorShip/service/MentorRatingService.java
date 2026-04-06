package com.ignite.MentorShip.service;

import com.ignite.MentorShip.dto.MentorRatingDTO;
import com.ignite.MentorShip.entity.MentorRating;

import java.util.List;

public interface MentorRatingService {

    MentorRating addRating(MentorRatingDTO dto);

    List<MentorRatingDTO> getMentorRatings(Long mentorId);

    double getAverageRating(Long mentorId);
}