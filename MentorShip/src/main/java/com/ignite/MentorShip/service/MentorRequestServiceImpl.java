package com.ignite.MentorShip.service;

import com.ignite.MentorShip.dto.MentorRequestDTO;
import com.ignite.MentorShip.dto.MentorResponseDTO;
import com.ignite.MentorShip.entity.*;
import com.ignite.MentorShip.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MentorRequestServiceImpl implements MentorRequestService {

    @Autowired
    MentorRequestRepository requestRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    MentorRepository mentorRepository;
    @Autowired
    ProjectRepository projectRepository;

    @Override
    public MentorRequest sendRequest(MentorRequestDTO dto) {

        Student student = studentRepository.findById(dto.getStudentId()).orElseThrow();
        Mentor mentor = mentorRepository.findById(dto.getMentorId()).orElseThrow();
        Project project = projectRepository.findById(dto.getProjectId()).orElseThrow(); // ✅ NEW

        MentorRequest request = new MentorRequest();
        request.setStudent(student);
        request.setMentor(mentor);
        request.setProject(project);   // ✅ IMPORTANT
        request.setMessage(dto.getMessage());
        request.setStatus("PENDING");

        return requestRepository.save(request);
    }


    @Override
    public String acceptRequest(Long requestId) {

        Optional<MentorRequest> req = requestRepository.findById(requestId);

        if(req.isPresent()){

            MentorRequest request = req.get();
            request.setStatus("ACCEPTED");

            requestRepository.save(request);

            return "Request Accepted";
        }

        return "Request Not Found";
    }

    @Override
    public String rejectRequest(Long requestId) {

        Optional<MentorRequest> req = requestRepository.findById(requestId);

        if(req.isPresent()){

            MentorRequest request = req.get();
            request.setStatus("REJECTED");

            requestRepository.save(request);

            return "Request Rejected";
        }

        return "Request Not Found";
    }

    @Override
    public List<MentorResponseDTO> getMentorRequests(Long mentorId) {
        // 1. Fetch the entities from the repository
        List<MentorRequest> requests = requestRepository.findByMentorId(mentorId);

        // 2. Map Entities to DTOs
        return requests.stream().map(req -> {
            MentorResponseDTO dto = new MentorResponseDTO();

            // Basic Info
            dto.setId(req.getId());
            dto.setStatus(req.getStatus());
            dto.setMessage(req.getMessage());

            // Mapping Student Info (Assuming req.getStudent() returns Student Entity)
            if (req.getStudent() != null) {
                dto.setStudentId(req.getStudent().getId());
                dto.setStudentName(req.getStudent().getName());
                dto.setStudentEmail(req.getStudent().getEmail());
            }

            // Mapping Project Info (Assuming req.getProject() returns Project Entity)
            if (req.getProject() != null) {
                dto.setProjectId(req.getProject().getId());
                dto.setProjectName(req.getProject().getProjectName());
                dto.setProjectDomain(req.getProject().getDomain());
                dto.setProjectDescription(req.getProject().getDescription());
            }

            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public Object getStudentRequests(Long studentId) {
        return requestRepository.findByStudentId(studentId);
    }
}