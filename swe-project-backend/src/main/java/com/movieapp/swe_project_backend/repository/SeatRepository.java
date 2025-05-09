package com.movieapp.swe_project_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.movieapp.swe_project_backend.model.Seat;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Integer> {
    List<Seat> findByAuditoriumAuditoriumID(int auditoriumID);

    Optional<Seat> findSeatByAuditorium_AuditoriumIDAndSeatRowAndSeatNum(int auditoriumID, String seatRow, int seatNum);
}
