package com.movieapp.swe_project_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.movieapp.swe_project_backend.model.MovieShowSeat;

@Repository
public interface MovieShowSeatRepository extends JpaRepository<MovieShowSeat, Integer> {
    List<MovieShowSeat> findByMovieShowMovieShowIDAndSeatStatus(int movieShowID, MovieShowSeat.SeatStatus seatStatus);

    @Modifying
    @Transactional
    @Query("DELETE FROM MovieShowSeat m WHERE m.movieShow.movieShowID = :movieShowID")
    void deleteByMovieShowID(@Param("movieShowID") int movieShowID);
}
