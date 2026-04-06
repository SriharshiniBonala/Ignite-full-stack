package com.ignite.MentorShip.repository;

import com.ignite.MentorShip.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project,Long> {

    List<Project> findByStudentId(Long studentId);

}