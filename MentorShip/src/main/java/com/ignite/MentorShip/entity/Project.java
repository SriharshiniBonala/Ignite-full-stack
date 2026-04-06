package com.ignite.MentorShip.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String projectName;
    private String domain;
    private Double budget;
    private String description;
    private String tools;
    private String technologies;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    public Project(){}

    public void setId(Long id) {
        this.id = id;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTools(String tools) {
        this.tools = tools;
    }

    public void setTechnologies(String technologies) {
        this.technologies = technologies;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
}