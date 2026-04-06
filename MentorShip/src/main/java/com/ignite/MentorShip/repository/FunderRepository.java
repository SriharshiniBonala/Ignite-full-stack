package com.ignite.MentorShip.repository;

import com.ignite.MentorShip.entity.Funder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FunderRepository extends JpaRepository<Funder, Long> {

    Optional<Funder> findByEmail(String email);

}