package com.ignite.MentorShip.service;

import com.ignite.MentorShip.dto.*;

import java.util.List;

public interface MentorService {

    String registerMentor(MentorRegisterDTO dto);

    MentorDTO loginMentor(MentorLoginDTO dto);

    Object getMentor(Long id);

    List<MentorDTO> getAllMentors();

    List<MentorDTO> searchMentor(String domain);

    String updateMentor(Long id, MentorRegisterDTO dto);

    String deleteMentor(Long id);

}