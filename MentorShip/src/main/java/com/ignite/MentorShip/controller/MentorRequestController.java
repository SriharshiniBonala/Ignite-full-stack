package com.ignite.MentorShip.controller;

import com.ignite.MentorShip.dto.MentorRequestDTO;
import com.ignite.MentorShip.entity.MentorRequest;
import com.ignite.MentorShip.service.MentorRequestService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin("http://localhost:3000")
public class MentorRequestController {

    @Autowired
    MentorRequestService requestService;

    @PostMapping
    public MentorRequest sendRequest(@RequestBody MentorRequestDTO dto){
        return requestService.sendRequest(dto);
    }

    @PutMapping("/accept/{id}")
    public String accept(@PathVariable Long id){
        return requestService.acceptRequest(id);
    }

    @PutMapping("/reject/{id}")
    public String reject(@PathVariable Long id){
        return requestService.rejectRequest(id);
    }

    @GetMapping("/mentor/{mentorId}")
    public Object mentorRequests(@PathVariable Long mentorId){
        return requestService.getMentorRequests(mentorId);
    }

    @GetMapping("/student/{studentId}")
    public Object studentRequests(@PathVariable Long studentId){
        return requestService.getStudentRequests(studentId);
    }
}