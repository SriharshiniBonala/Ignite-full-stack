package com.ignite.MentorShip.controller;

import com.ignite.MentorShip.dto.MentorRatingDTO;
import com.ignite.MentorShip.entity.MentorRating;
import com.ignite.MentorShip.service.MentorRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
@CrossOrigin("http://localhost:3000")
public class MentorRatingController {

    @Autowired
    MentorRatingService ratingService;

    @PostMapping
    public MentorRating addRating(@RequestBody MentorRatingDTO dto){
        return ratingService.addRating(dto);
    }

    @GetMapping("/{mentorId}")
    public List<MentorRatingDTO> getRatings(@PathVariable Long mentorId){
        return ratingService.getMentorRatings(mentorId);
    }

    @GetMapping("/average/{mentorId}")
    public double getAverage(@PathVariable Long mentorId){
        return ratingService.getAverageRating(mentorId);
    }
}