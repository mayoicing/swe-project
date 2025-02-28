package com.movieapp.swe_project_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
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
    public Optional<MovieInfo> getMovieInfoById(int id) {
        return movieInfoRepository.findById(id);
    }


    @Override
    public Optional<String> getMovieTitleById(int id) {
        return movieInfoRepository.findById(id).map(MovieInfo::getTitle);
    }

    @Override
    public Optional<String> getMovieDescriptionById(int id) {
        return movieInfoRepository.findById(id).map(MovieInfo::getDescription);
    }


    @Override
    public Optional<MovieInfo> getMovieInfoByTitle(String title) {
        return movieInfoRepository.findByTitle(title);
    }

    @Override
    public Optional<String> getMoviePosterById(int id) {
        return movieInfoRepository.findById(id).map(MovieInfo::getPoster);
}
}
