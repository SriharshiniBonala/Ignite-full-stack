package com.ignite.MentorShip.dto;

public class MentorRequestDTO {

    private Long studentId;
    private Long mentorId;
    private Long projectId;   // ✅ NEW FIELD
    private String message;

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getMentorId() {
        return mentorId;
    }

    public void setMentorId(Long mentorId) {
        this.mentorId = mentorId;
    }

    public Long getProjectId() {   // ✅ NEW
        return projectId;
    }

    public void setProjectId(Long projectId) {   // ✅ NEW
        this.projectId = projectId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}