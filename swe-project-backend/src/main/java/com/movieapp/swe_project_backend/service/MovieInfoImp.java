package com.movieapp.swe_project_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

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
    
}
