package com.movieapp.swe_project_backend.service;
import java.util.List;
import java.util.Optional;

import com.movieapp.swe_project_backend.model.MovieInfo;

public interface MovieInfoService {

    public MovieInfo saveMovieInfo(MovieInfo movieInfo);
    public List<MovieInfo> getAllMovieInfo();

    Optional<String> getMovieTitleById(int id); 
    Optional<String> getMovieDescriptionById(int id);

    Optional<MovieInfo> getMovieInfoById(int id); // ✅ Get by ID
    Optional<MovieInfo> getMovieInfoByTitle(String title); // ✅ Get by Title
    
    Optional<String> getMoviePosterById(int id);

    
}
