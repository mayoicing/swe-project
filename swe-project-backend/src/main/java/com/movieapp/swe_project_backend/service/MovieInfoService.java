package com.movieapp.swe_project_backend.service;
import java.util.List;
import java.util.Optional;

import com.movieapp.swe_project_backend.model.MovieInfo;

public interface MovieInfoService {

    public MovieInfo saveMovieInfo(MovieInfo movieInfo);
    public List<MovieInfo> getAllMovieInfo();

    Optional<String> getMovieTitleById(int movieID); 
    Optional<String> getMovieDescriptionById(int movieID);

    Optional<MovieInfo> getMovieInfoById(int movieID); // Get by ID
    Optional<MovieInfo> getMovieInfoByTitle(String title); // Get by Title
    
    Optional<String> getMoviePosterById(int movieID);

    
}
