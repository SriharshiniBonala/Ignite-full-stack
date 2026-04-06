package com.ignite.MentorShip.repository;

import com.ignite.MentorShip.entity.Mentor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MentorRepository extends JpaRepository<Mentor,Long> {

    Mentor findByEmailAndPassword(String email,String password);

    List<Mentor> findByExpertiseContaining(String expertise);

}