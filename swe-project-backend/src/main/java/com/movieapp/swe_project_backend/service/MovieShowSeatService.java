package com.movieapp.swe_project_backend.service;

import java.util.List;

import com.movieapp.swe_project_backend.model.MovieShowSeat;
import com.movieapp.swe_project_backend.model.MovieShowSeat.SeatStatus;

public interface MovieShowSeatService {
    List<MovieShowSeat> getUnavailableSeatsByMovieShow(int movieShowID);
    List<MovieShowSeat> initializeSeatsForMovieShow(int movieShowID, int auditoriumID);
    void updateSeatStatus(int movieShowSeatID, SeatStatus seatStatus);
    void deleteSeatsByMovieShowID(int movieShowID);
    List<MovieShowSeat> getAllSeatsForMovieShow(int movieShowID);
}
