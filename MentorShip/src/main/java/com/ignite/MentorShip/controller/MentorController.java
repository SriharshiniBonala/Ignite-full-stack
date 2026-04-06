package com.ignite.MentorShip.controller;

import com.ignite.MentorShip.dto.*;
import com.ignite.MentorShip.service.MentorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mentors")
@CrossOrigin("http://localhost:3000")
public class MentorController {

    @Autowired
    MentorService mentorService;

    @PostMapping("/register")
    public String register(@RequestBody MentorRegisterDTO dto){
        return mentorService.registerMentor(dto);
    }

    @PostMapping("/login")
    public MentorDTO login(@RequestBody MentorLoginDTO dto){
        return mentorService.loginMentor(dto);
    }

    @GetMapping("/{id}")
    public Object getMentor(@PathVariable Long id){
        return mentorService.getMentor(id);
    }

    @GetMapping
    public Object getAllMentors(){
        return mentorService.getAllMentors();
    }

    @GetMapping("/search/{domain}")
    public Object searchMentor(@PathVariable String domain){
        return mentorService.searchMentor(domain);
    }

    @PutMapping("/{id}")
    public String updateMentor(@PathVariable Long id,
                               @RequestBody MentorRegisterDTO dto){
        return mentorService.updateMentor(id,dto);
    }

    @DeleteMapping("/{id}")
    public String deleteMentor(@PathVariable Long id){
        return mentorService.deleteMentor(id);
    }
}