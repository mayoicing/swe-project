package com.movieapp.swe_project_backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movieapp.swe_project_backend.model.MovieShow;
import com.movieapp.swe_project_backend.service.MovieShowService;

@RestController
@RequestMapping("/movieshow")
public class MovieShowController {

    @Autowired
    private MovieShowService movieShowService;

    @PostMapping("/add")
    public ResponseEntity<String> addMovieShow(@RequestBody MovieShow movieShow) {
        movieShowService.saveMovieShow(movieShow);
        return ResponseEntity.ok("Showtime added successfully!");
    }

    @GetMapping("/getAll")
    public List<MovieShow> getAllMovieShows() {
        return movieShowService.getAllMovieShows();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<MovieShow> getMovieShowById(@PathVariable int id) {
        Optional<MovieShow> movieShow = movieShowService.getMovieShowById(id);
        return movieShow.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/movie/{movieID}")
    public List<MovieShow> getMovieShowsByMovieID(@PathVariable int movieID) {
        return movieShowService.getShowsByMovieId(movieID);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMovieShow(@PathVariable int id) {
        movieShowService.deleteMovieShow(id);
        return ResponseEntity.ok("Showtime deleted successfully!");
    }
}
