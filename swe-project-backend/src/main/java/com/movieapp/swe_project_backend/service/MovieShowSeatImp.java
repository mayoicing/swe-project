package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.ArrayList;

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

    @Autowired
    private AuditoriumService auditoriumService;

    @Override
    public List<MovieShowSeat> getUnavailableSeatsByMovieShow(int movieShowID) {
        return movieShowSeatRepository.findByMovieShowMovieShowIDAndSeatStatus(movieShowID, MovieShowSeat.SeatStatus.Unavailable);
    }

    @Override
    public List<MovieShowSeat> initializeSeatsForMovieShow(int movieShowID, int auditoriumID) {
       List<MovieShowSeat> seats = new ArrayList<>();

        // Fetch the movie show
        MovieShow movieShow = movieShowRepository.findById(movieShowID)
            .orElseThrow(() -> new RuntimeException("MovieShow not found"));

        // Fetch the seats for the specific auditorium
        List<Seat> auditoriumSeats = seatRepository.findByAuditoriumAuditoriumID(auditoriumID);

        // Create MovieShowSeat for each seat in the auditorium
        for (Seat seat : auditoriumSeats) {
            MovieShowSeat movieShowSeat = new MovieShowSeat();
            movieShowSeat.setSeat(seat);
            movieShowSeat.setMovieShow(movieShow);
            movieShowSeat.setSeatStatus(MovieShowSeat.SeatStatus.Available);
            seats.add(movieShowSeatRepository.save(movieShowSeat));
        }
        return seats;
    }

    @Override
    public void updateSeatStatus(int movieShowSeatID, SeatStatus seatStatus) {
        MovieShowSeat movieShowSeat = movieShowSeatRepository.findById(movieShowSeatID)
                .orElseThrow(() -> new RuntimeException("Seat not found"));
        movieShowSeat.setSeatStatus(seatStatus);
        movieShowSeatRepository.save(movieShowSeat);
    }

    @Override
    @Transactional
    public void deleteSeatsByMovieShowID(int movieShowID) {
        movieShowSeatRepository.deleteByMovieShowID(movieShowID);
    }

    @Override
    public List<MovieShowSeat> getAllSeatsForMovieShow(int movieShowID) {
        return movieShowSeatRepository.findAllByMovieShowMovieShowID(movieShowID);
    }
}