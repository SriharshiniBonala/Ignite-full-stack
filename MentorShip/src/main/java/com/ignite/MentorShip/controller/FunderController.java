package com.ignite.MentorShip.controller;

import com.ignite.MentorShip.dto.FunderDTO;
import com.ignite.MentorShip.entity.Funder;
import com.ignite.MentorShip.service.FunderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/funders")
@CrossOrigin
public class FunderController {

    @Autowired
    private FunderService funderService;

    // Register
    @PostMapping("/register")
    public Funder register(@RequestBody FunderDTO dto) {
        return funderService.register(dto);
    }

    // Login
    @PostMapping("/login")
    public Funder login(@RequestBody FunderDTO dto) {
        return funderService.login(dto.getEmail(), dto.getPassword());
    }

    // Get all funders
    @GetMapping
    public List<Funder> getAllFunders() {
        return funderService.getAllFunders();
    }
}