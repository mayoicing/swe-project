package com.movieapp.swe_project_backend.repository;

import com.movieapp.swe_project_backend.model.CastAndCrew;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CastAndCrewRepository extends JpaRepository<CastAndCrew, Long> {
}