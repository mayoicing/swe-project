package com.movieapp.swe_project_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.movieapp.swe_project_backend.model.Auditorium;

@Repository
public interface AuditoriumRepository extends JpaRepository<Auditorium, Integer> {
    Optional<Auditorium> findByAuditoriumName(String auditoriumName);

    @Query("SELECT a.noOfSeats FROM Auditorium a WHERE a.id = :auditoriumId")
    Integer findTotalSeatsByAuditoriumID(@Param("auditoriumId") int auditoriumId);
}