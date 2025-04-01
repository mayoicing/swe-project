package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movieapp.swe_project_backend.model.MovieInfo;
import com.movieapp.swe_project_backend.repository.MovieInfoRepository;

@Service

public class MovieInfoImp implements MovieInfoService{

    @Autowired
    private MovieInfoRepository movieInfoRepository;

    @Override
    public MovieInfo saveMovieInfo(MovieInfo movieInfo) {
        return movieInfoRepository.save(movieInfo);
    }

    @Override
    public List<MovieInfo> getAllMovieInfo() {
        return movieInfoRepository.findAll();
    }
    
    @Override
    public Optional<MovieInfo> getMovieInfoById(int movieID) {
        return movieInfoRepository.findById(movieID);
    }

      @Override
    public Optional<String> getMovieTitleById(int movieID) {
        return movieInfoRepository.findById(movieID).map(MovieInfo::getTitle);
    }

    @Override
    public Optional<String> getMovieDescriptionById(int movieID) {
        return movieInfoRepository.findById(movieID).map(MovieInfo::getDescription);
    }

    @Override
    public Optional<MovieInfo> getMovieInfoByTitle(String title) {
        return movieInfoRepository.findByTitle(title);
    }

    @Override
    public Optional<String> getMoviePosterById(int movieID) {
        return movieInfoRepository.findById(movieID).map(MovieInfo::getPoster);
    }   

    @Override
    public List<MovieInfo> getMoviesByGenre(String genre) {
        return movieInfoRepository.findByGenreContainingIgnoreCase(genre);
    }
}
