package com.ignite.MentorShip.service;

import com.ignite.MentorShip.dto.*;

import java.util.List;

public interface StudentService {

    String updateStudent(Long id, StudentRegisterDTO dto) ;

    String registerStudent(StudentRegisterDTO dto);

    StudentResponseDTO loginStudent(StudentLoginDTO dto);

    Object getStudent(Long id);

    String uploadProject(ProjectDTO dto);

    List<?> getStudentProjects(Long studentId);

}