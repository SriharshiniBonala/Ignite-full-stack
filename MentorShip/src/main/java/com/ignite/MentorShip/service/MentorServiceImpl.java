package com.ignite.MentorShip.service;

import com.ignite.MentorShip.dto.*;
import com.ignite.MentorShip.entity.Mentor;
import com.ignite.MentorShip.repository.MentorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MentorServiceImpl implements MentorService {

    @Autowired
    MentorRepository mentorRepository;

    @Override
    public String registerMentor(MentorRegisterDTO dto) {

        Mentor mentor = new Mentor();

        mentor.setName(dto.getName());
        mentor.setEmail(dto.getEmail());
        mentor.setPassword(dto.getPassword());
        mentor.setExpertise(dto.getExpertise());
        mentor.setExperience(dto.getExperience());
        mentor.setOrganization(dto.getOrganization());

        mentorRepository.save(mentor);

        return "Mentor Registered Successfully";
    }

    @Override
    public MentorDTO loginMentor(MentorLoginDTO dto) {

        Mentor mentor = mentorRepository
                .findByEmailAndPassword(dto.getEmail(), dto.getPassword());

        if (mentor == null) {
            throw new RuntimeException("Invalid Credentials");
        }

        MentorDTO response = new MentorDTO();

        response.setId(mentor.getId());
        response.setName(mentor.getName());
        response.setExpertise(mentor.getExpertise());
        response.setExperience(mentor.getExperience());
        response.setOrganization(mentor.getOrganization());

        return response;
    }

    @Override
    public Object getMentor(Long id) {
        return mentorRepository.findById(id);
    }

    @Override
    public List<MentorDTO> getAllMentors() {

        List<Mentor> mentors = mentorRepository.findAll();
        List<MentorDTO> list = new ArrayList<>();

        for(Mentor m : mentors){

            MentorDTO dto = new MentorDTO();

            dto.setId(m.getId());
            dto.setName(m.getName());
            dto.setExpertise(m.getExpertise());
            dto.setExperience(m.getExperience());
            dto.setOrganization(m.getOrganization());

            list.add(dto);
        }

        return list;
    }

    @Override
    public List<MentorDTO> searchMentor(String domain) {

        List<Mentor> mentors = mentorRepository.findByExpertiseContaining(domain);
        List<MentorDTO> list = new ArrayList<>();

        for(Mentor m : mentors){

            MentorDTO dto = new MentorDTO();

            dto.setId(m.getId());
            dto.setName(m.getName());
            dto.setExpertise(m.getExpertise());
            dto.setExperience(m.getExperience());
            dto.setOrganization(m.getOrganization());

            list.add(dto);
        }

        return list;
    }

    @Override
    public String updateMentor(Long id, MentorRegisterDTO dto) {

        Optional<Mentor> mentor = mentorRepository.findById(id);

        if(mentor.isPresent()){

            Mentor m = mentor.get();

            m.setName(dto.getName());
            m.setExpertise(dto.getExpertise());
            m.setExperience(dto.getExperience());
            m.setOrganization(dto.getOrganization());

            mentorRepository.save(m);

            return "Mentor Updated Successfully";
        }

        return "Mentor Not Found";
    }

    @Override
    public String deleteMentor(Long id) {

        mentorRepository.deleteById(id);
        return "Mentor Deleted Successfully";
    }
}