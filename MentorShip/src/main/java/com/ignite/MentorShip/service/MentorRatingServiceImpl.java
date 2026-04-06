package com.ignite.MentorShip.service;

import com.ignite.MentorShip.dto.MentorRatingDTO;
import com.ignite.MentorShip.entity.*;
import com.ignite.MentorShip.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MentorRatingServiceImpl implements MentorRatingService {

    @Autowired
    MentorRatingRepository ratingRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    MentorRepository mentorRepository;

    @Autowired
    MentorRequestRepository requestRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Override
    public MentorRating addRating(MentorRatingDTO dto) {

        // Check if student and mentor exist
        Optional<Student> student = studentRepository.findById(dto.getStudentId());
        Optional<Mentor> mentor = mentorRepository.findById(dto.getMentorId());
        Optional<Project> project=projectRepository.findById(dto.getProjectId());

        if(student.isEmpty() || mentor.isEmpty()||project.isEmpty())
            return null;

        // Check if student has accepted request with this mentor
        List<MentorRequest> requests = requestRepository
                .findByStudentId(dto.getStudentId());

        boolean hasAccepted = requests.stream()
                .anyMatch(r -> r.getMentor().getId().equals(dto.getMentorId())
                        && "ACCEPTED".equals(r.getStatus()));

        if(!hasAccepted)
            return null;

        MentorRating rating = new MentorRating();
        rating.setStudent(student.get());
        rating.setMentor(mentor.get());
        rating.setRating(dto.getRating());
        rating.setComment(dto.getComment());
        rating.setProject(project.get());

        ratingRepository.save(rating);

        return rating;
    }

    @Override
    public List<MentorRatingDTO> getMentorRatings(Long mentorId) {

        List<MentorRating> ratings = ratingRepository.findByMentorId(mentorId);
        List<MentorRatingDTO> list = new ArrayList<>();

        for(MentorRating r : ratings){
            MentorRatingDTO dto = new MentorRatingDTO();
            dto.setStudentId(r.getStudent().getId());
            dto.setMentorId(r.getMentor().getId());
            dto.setProjectId(r.getProject().getId());
            dto.setRating(r.getRating());
         //   dto.setComment(r.getComment());
            list.add(dto);
        }

        return list;
    }

    @Override
    public double getAverageRating(Long mentorId) {
        List<MentorRating> ratings = ratingRepository.findByMentorId(mentorId);

        if(ratings.isEmpty()) return 0;

        double sum = 0;
        for(MentorRating r : ratings){
            sum += r.getRating();
        }

        return sum / ratings.size();
    }
}