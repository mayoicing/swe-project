package com.movieapp.swe_project_backend.controller;

import com.movieapp.swe_project_backend.model.MovieInfo;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

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

   // ✅ Get Movie by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<MovieInfo> getMovieById(@PathVariable int id) {
        Optional<MovieInfo> movie = movieInfoService.getMovieInfoById(id);
        return movie.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Get Movie by Title
    @GetMapping("/get/title/{title}")
    public ResponseEntity<MovieInfo> getMovieByTitle(@PathVariable String title) {
        Optional<MovieInfo> movie = movieInfoService.getMovieInfoByTitle(title);
        return movie.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Get only the Title
    @GetMapping("/get/{id}/title")
    public ResponseEntity<String> getMovieTitle(@PathVariable int id) {
        return movieInfoService.getMovieTitleById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
}

    // ✅ Get only the Poster
    @GetMapping("/get/{id}/poster")
    public ResponseEntity<String> getMoviePoster(@PathVariable int id) {
        return movieInfoService.getMoviePosterById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
}

    // ✅ Get only the Description
    @GetMapping("/get/{id}/description")
    public ResponseEntity<String> getMovieDescription(@PathVariable int id) {
        return movieInfoService.getMovieDescriptionById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
}


}
