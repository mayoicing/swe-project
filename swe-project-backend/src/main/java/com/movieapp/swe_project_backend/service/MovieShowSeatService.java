package com.movieapp.swe_project_backend.service;

import java.util.List;

import com.movieapp.swe_project_backend.model.MovieShowSeat;

public interface MovieShowSeatService {
    List<MovieShowSeat> getSeatsByMovieShow(int movieShowID);
    void initializeSeatsForMovieShow(int movieShowID, int auditoriumID);
    void updateSeatStatus(int movieShowSeatID, String status);
    void deleteSeatsByMovieShowID(int movieShowID);
}
