package com.ignite.MentorShip.entity;

import jakarta.persistence.*;

@Entity
@Table(name="mentor_ratings")
public class MentorRating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name="mentor_id")
    private Mentor mentor;

    @ManyToOne
    @JoinColumn(name="project_id") // ✅ Added project reference
    private Project project;

    private Integer rating; // 1-5
    @Column(name = "comments")
    private String comments;

    public MentorRating(){}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public Mentor getMentor() { return mentor; }
    public void setMentor(Mentor mentor) { this.mentor = mentor; }

    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getComment() { return comments; }
    public void setComment(String comment) { this.comments= comments; }
}