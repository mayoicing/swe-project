package com.movieapp.swe_project_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.movieapp.swe_project_backend.model.CastAndCrew;

@Repository
public interface CastAndCrewRepository extends JpaRepository<CastAndCrew, Integer> {
    List<CastAndCrew> findByMovieID(int movieID);
}
