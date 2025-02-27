package com.movieapp.swe_project_backend.controller;

import com.movieapp.swe_project_backend.model.MovieInfo;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movieapp.swe_project_backend.service.MovieInfoService;

@RestController
@RequestMapping("/movieinfo")
public class MovieInfoController {

    @Autowired
    private MovieInfoService movieInfoService; // Renamed to avoid confusion

    @PostMapping("/add")
    public String add(@RequestBody MovieInfo movieInfo) { // Fixed parameter name
        movieInfoService.saveMovieInfo(movieInfo); // Use the service to save
        return "Movie info is added";
    }

    @GetMapping("/getAll")
    public List<MovieInfo> getAllMovieInfo(){
        return movieInfoService.getAllMovieInfo();
    }

}