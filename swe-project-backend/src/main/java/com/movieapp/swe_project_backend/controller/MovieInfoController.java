package com.movieapp.swe_project_backend.controller;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movieapp.swe_project_backend.model.MovieInfo;
import com.movieapp.swe_project_backend.service.MovieInfoService;

@RestController
@RequestMapping("/movieinfo")
// @CrossOrigin(origins = "http://localhost:3000") // Allows frontend to call backend
public class MovieInfoController {

    private String encodeUrl(String url) {
        return URLEncoder.encode(url, StandardCharsets.UTF_8);
    }

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
    @GetMapping("/get/{movieID}")
    public ResponseEntity<MovieInfo> getMovieById(@PathVariable int movieID) {
        Optional<MovieInfo> movie = movieInfoService.getMovieInfoById(movieID);
        
        if (movie.isPresent()) {
            MovieInfo movieInfo = movie.get();
            movieInfo.setPoster(encodeUrl(movieInfo.getPoster()));
            return ResponseEntity.ok(movieInfo);
        } else {
            return ResponseEntity.notFound().build();
        }
        
        /*
        return movie.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        */
    }

    // ✅ Get Movie by Title
    @GetMapping("/get/title/{title}")
    public ResponseEntity<MovieInfo> getMovieByTitle(@PathVariable String title) {
        Optional<MovieInfo> movie = movieInfoService.getMovieInfoByTitle(title);
        
        if (movie.isPresent()) {
            MovieInfo movieInfo = movie.get();
            movieInfo.setPoster(encodeUrl(movieInfo.getPoster()));
            return ResponseEntity.ok(movieInfo);
        } else {
            return ResponseEntity.notFound().build();   
        }
        /*
        return movie.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        */
    }

    // ✅ Get only the Title
    @GetMapping("/get/{movieID}/title")
    public ResponseEntity<String> getMovieTitle(@PathVariable int movieID) {
        return movieInfoService.getMovieTitleById(movieID)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
}

    // ✅ Get only the Poster
    @GetMapping("/get/{movieID}/poster")
    public ResponseEntity<String> getMoviePoster(@PathVariable int movieID) {
        return movieInfoService.getMoviePosterById(movieID)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
}

    // ✅ Get only the Description
    @GetMapping("/get/{movieID}/description")
    public ResponseEntity<String> getMovieDescription(@PathVariable int movieID) {
        return movieInfoService.getMovieDescriptionById(movieID)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
}


}
