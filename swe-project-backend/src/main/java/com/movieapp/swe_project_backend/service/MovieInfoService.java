package com.movieapp.swe_project_backend.service;
import java.util.List;

import com.movieapp.swe_project_backend.model.MovieInfo;

public interface MovieInfoService {

    public MovieInfo saveMovieInfo(MovieInfo movieInfo);
    public List<MovieInfo> getAllMovieInfo();
    
}
