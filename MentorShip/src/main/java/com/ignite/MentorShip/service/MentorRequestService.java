package com.ignite.MentorShip.service;

import com.ignite.MentorShip.dto.MentorRequestDTO;
import com.ignite.MentorShip.entity.MentorRequest;

public interface MentorRequestService {

    MentorRequest sendRequest(MentorRequestDTO dto);

    String acceptRequest(Long requestId);

    String rejectRequest(Long requestId);

    Object getMentorRequests(Long mentorId);

    Object getStudentRequests(Long studentId);
}