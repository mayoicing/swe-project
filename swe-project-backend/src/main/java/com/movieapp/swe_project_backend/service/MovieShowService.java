package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import com.movieapp.swe_project_backend.model.MovieShow;

public interface MovieShowService {
    MovieShow saveMovieShow(MovieShow show);
    List<MovieShow> getAllMovieShows();
    Optional<MovieShow> getMovieShowById(int id);
    List<MovieShow> getShowsByMovieId(int movieId);
    void deleteMovieShow(int id);
}