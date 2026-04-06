package com.ignite.MentorShip.dto;

public class MentorRatingDTO {

    private Long studentId;
    private Long mentorId;
    private Long projectId;   // ✅ new field
    private Integer rating;
    private String comments;

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public Long getMentorId() { return mentorId; }
    public void setMentorId(Long mentorId) { this.mentorId = mentorId; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getComment() { return comments; }
    public void setComment(String comment) { this.comments = comments; }
}