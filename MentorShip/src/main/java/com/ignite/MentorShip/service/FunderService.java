package com.ignite.MentorShip.service;

import com.ignite.MentorShip.dto.FunderDTO;
import com.ignite.MentorShip.entity.Funder;
import com.ignite.MentorShip.repository.FunderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FunderService {

    @Autowired
    private FunderRepository funderRepository;

    // Register
    public Funder register(FunderDTO dto) {
        Funder funder = new Funder();
        funder.setName(dto.getName());
        funder.setEmail(dto.getEmail());
        funder.setPassword(dto.getPassword());
        funder.setOrganization(dto.getOrganization());
        funder.setFundingAmount(dto.getFundingAmount());
        funder.setDomain(dto.getDomain());
        funder.setDescription(dto.getDescription());
        funder.setContact(dto.getContact());

        return funderRepository.save(funder);
    }

    // Login
    public Funder login(String email, String password) {
        return funderRepository.findByEmail(email)
                .filter(f -> f.getPassword().equals(password))
                .orElse(null);
    }

    // Get all funders
    public List<Funder> getAllFunders() {
        return funderRepository.findAll();
    }
}