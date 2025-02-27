package com.movieapp.swe_project_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movieapp.swe_project_backend.model.MovieInfo;
import com.movieapp.swe_project_backend.service.MovieInfoService;

@RestController
@RequestMapping("/movieinfo")
public class MovieInfoController {

    @Autowired
    private MovieInfoService movieInfoService; // Correct: Inject the interface, not the implementation

    @PostMapping("/add")
    public String add(@RequestBody MovieInfo movieInfo) {
        movieInfoService.saveMovieInfo(movieInfo); // Ensure service method is implemented correctly
        return "Movie info added";
    }
}
