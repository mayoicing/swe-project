package com.movieapp.swe_project_backend.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movieapp.swe_project_backend.model.MovieInfo;
import com.movieapp.swe_project_backend.repository.MovieInfoRepository;

@Service
public class MovieInfoImp implements MovieInfoService {

    private final MovieInfoRepository movieInfoRepository;

    @Autowired
    public MovieInfoImp(MovieInfoRepository movieInfoRepository) {
        this.movieInfoRepository = movieInfoRepository;
    }

    @Override
    public MovieInfo saveMovieInfo(MovieInfo movieInfo) {
        return movieInfoRepository.save(movieInfo);
    }

    @Override
    public List<MovieInfo> getAllMovieInfo() {  // 🔥 Add this missing method
        return movieInfoRepository.findAll();
    }
}
