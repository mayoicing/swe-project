package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movieapp.swe_project_backend.model.MovieShow;
import com.movieapp.swe_project_backend.repository.MovieShowRepository;

@Service
public class MovieShowImp implements MovieShowService {

    @Autowired
    private MovieShowRepository movieShowRepository;

    @Override
    public MovieShow saveMovieShow(MovieShow show) {
        return movieShowRepository.save(show);
    }

    @Override
    public List<MovieShow> getAllMovieShows() {
        return movieShowRepository.findAll();
    }

    @Override
    public Optional<MovieShow> getMovieShowById(int id) {
        return movieShowRepository.findById(id);
    }

    @Override
    public List<MovieShow> getShowsByMovieId(int movieId) {
        return movieShowRepository.findByMovieID(movieId);
    }

    @Override
    public void deleteMovieShow(int id) {
        movieShowRepository.deleteById(id);
    }
}