package com.ignite.MentorShip.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "funders")
public class Funder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;

    private String organization;
    private Double fundingAmount;
    private String domain; // e.g. AI, Web, Blockchain
    private String description;
    private String contact;

    public Funder() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getOrganization() { return organization; }
    public void setOrganization(String organization) { this.organization = organization; }

    public Double getFundingAmount() { return fundingAmount; }
    public void setFundingAmount(Double fundingAmount) { this.fundingAmount = fundingAmount; }

    public String getDomain() { return domain; }
    public void setDomain(String domain) { this.domain = domain; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }
}