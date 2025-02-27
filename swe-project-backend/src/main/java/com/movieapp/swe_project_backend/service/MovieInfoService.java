package com.movieapp.swe_project_backend.service;

import java.util.Optional;
import java.util.List;
import com.movieapp.swe_project_backend.model.MovieInfo;

public interface MovieInfoService {
    MovieInfo saveMovieInfo(MovieInfo movieInfo);
    List<MovieInfo> getAllMovieInfo();

}