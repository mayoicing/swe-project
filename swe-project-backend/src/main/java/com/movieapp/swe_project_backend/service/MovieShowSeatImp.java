package com.movieapp.swe_project_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.movieapp.swe_project_backend.model.MovieShow;
import com.movieapp.swe_project_backend.model.MovieShowSeat;
import com.movieapp.swe_project_backend.model.MovieShowSeat.SeatStatus;
import com.movieapp.swe_project_backend.model.Seat;
import com.movieapp.swe_project_backend.repository.MovieShowRepository;
import com.movieapp.swe_project_backend.repository.MovieShowSeatRepository;
import com.movieapp.swe_project_backend.repository.SeatRepository;

@Service
public class MovieShowSeatImp implements MovieShowSeatService {

    @Autowired
    private MovieShowSeatRepository movieShowSeatRepository;

    @Autowired
    private MovieShowRepository movieShowRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Override
    public List<MovieShowSeat> getSeatsByMovieShow(int movieShowID) {
        return movieShowSeatRepository.findByMovieShowMovieShowID(movieShowID);
    }

    @Override
    public void initializeSeatsForMovieShow(int movieShowID, int auditoriumID) {
        MovieShow movieShow = movieShowRepository.findById(movieShowID).orElseThrow(
                () -> new RuntimeException("MovieShow not found")
        );

        List<Seat> seats = seatRepository.findByAuditoriumAuditoriumID(auditoriumID);
        
        for (Seat seat : seats) {
            MovieShowSeat movieShowSeat = new MovieShowSeat();
            movieShowSeat.setMovieShow(movieShow);
            movieShowSeat.setSeat(seat);
            movieShowSeat.setSeatStatus(SeatStatus.Available);
            movieShowSeatRepository.save(movieShowSeat);
        }
    }

    @Override
    public void updateSeatStatus(int movieShowSeatID, String status) {
        MovieShowSeat movieShowSeat = movieShowSeatRepository.findById(movieShowSeatID)
                .orElseThrow(() -> new RuntimeException("Seat not found"));
        movieShowSeat.setSeatStatus(SeatStatus.valueOf(status.toUpperCase()));
        movieShowSeatRepository.save(movieShowSeat);
    }

    @Override
    @Transactional
    public void deleteSeatsByMovieShowID(int movieShowID) {
        movieShowSeatRepository.deleteByMovieShowID(movieShowID);
    }
}