package com.movieapp.swe_project_backend.controller;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movieapp.swe_project_backend.dto.MovieInfoDTO;
import com.movieapp.swe_project_backend.model.MovieInfo;
import com.movieapp.swe_project_backend.service.MovieInfoService;

@RestController
@RequestMapping("/movieinfo")
public class MovieInfoController {

    private String encodeUrl(String url) {
        return URLEncoder.encode(url, StandardCharsets.UTF_8);
    }

    @Autowired
    private MovieInfoService movieInfoService; 

    // Convert DTO to Entity (MovieInfo)
    private MovieInfo convertToEntity(MovieInfoDTO movieInfoDTO) {
        MovieInfo movieInfo = new MovieInfo();
        movieInfo.setMovieId(movieInfoDTO.getMovieID());
        movieInfo.setTitle(movieInfoDTO.getTitle());
        movieInfo.setDescription(movieInfoDTO.getDescription());
        movieInfo.setGenre(movieInfoDTO.getGenre());
        movieInfo.setFilmCode(movieInfoDTO.getFilmCode());
        movieInfo.setTrailer(movieInfoDTO.getTrailerUrl());
        movieInfo.setPoster(movieInfoDTO.getMoviePosterUrl());
        movieInfo.setRating(movieInfoDTO.getMovieRating());
        movieInfo.setDuration(movieInfoDTO.getMovieDuration());
        movieInfo.setFilter(movieInfoDTO.getFilter());
        return movieInfo;
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> add(@RequestBody MovieInfoDTO movieInfoDTO) { // Fixed parameter name
        MovieInfo movieInfo = convertToEntity(movieInfoDTO); // Convert DTO to Entity
        movieInfo = movieInfoService.saveMovieInfo(movieInfo); // Use the service to save
        
         Map<String, Object> response = new HashMap<>();
        response.put("message", "Movie info is added");
        response.put("movieID", movieInfo.getMovieId()); // Retrieve the generated movieID

        return ResponseEntity.ok(response);
    }   


    @GetMapping("/getAll")
    public List<MovieInfo> getAllMovieInfo(){
        return movieInfoService.getAllMovieInfo();
    }

   // Get Movie by ID
    @GetMapping("/get/{movieID}")
    public ResponseEntity<MovieInfoDTO> getMovieById(@PathVariable int movieID) {
        Optional<MovieInfo> movie = movieInfoService.getMovieInfoById(movieID);
        
        if (movie.isPresent()) {
            MovieInfo movieInfo = movie.get();
            movieInfo.setPoster(encodeUrl(movieInfo.getPoster()));

            // Convert MovieInfo to MovieInfoDTO
            MovieInfoDTO movieInfoDTO = new MovieInfoDTO(
                movieInfo.getMovieId(),
                movieInfo.getTitle(),
                movieInfo.getDescription(),
                movieInfo.getGenre(),
                movieInfo.getFilmCode(),
                movieInfo.getTrailer(),
                movieInfo.getPoster(),
                movieInfo.getRating(),
                movieInfo.getDuration(),
                movieInfo.getFilter()
            );
            return ResponseEntity.ok(movieInfoDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get Movie by Title
    @GetMapping("/get/title/{title}")
    public ResponseEntity<MovieInfoDTO> getMovieByTitle(@PathVariable String title) {
        Optional<MovieInfo> movie = movieInfoService.getMovieInfoByTitle(title);
        
        if (movie.isPresent()) {
            MovieInfo movieInfo = movie.get();
            movieInfo.setPoster(encodeUrl(movieInfo.getPoster()));

            // Convert MovieInfo to MovieInfoDTO
            MovieInfoDTO movieInfoDTO = new MovieInfoDTO(
                movieInfo.getMovieId(),
                movieInfo.getTitle(),
                movieInfo.getDescription(),
                movieInfo.getGenre(),
                movieInfo.getFilmCode(),
                movieInfo.getTrailer(),
                movieInfo.getPoster(),
                movieInfo.getRating(),
                movieInfo.getDuration(),
                movieInfo.getFilter()
            );
            return ResponseEntity.ok(movieInfoDTO);
        } else {
            return ResponseEntity.notFound().build();   
        }
    }

    // Get only the Title
    @GetMapping("/get/{movieID}/title")
    public ResponseEntity<String> getMovieTitle(@PathVariable int movieID) {
        return movieInfoService.getMovieTitleById(movieID)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get only the Poster
    @GetMapping("/get/{movieID}/poster")
    public ResponseEntity<String> getMoviePoster(@PathVariable int movieID) {
        return movieInfoService.getMoviePosterById(movieID)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get only the Description
    @GetMapping("/get/{movieID}/description")
    public ResponseEntity<String> getMovieDescription(@PathVariable int movieID) {
        return movieInfoService.getMovieDescriptionById(movieID)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get Movies by Genre
    @GetMapping("/get/genre/{genre}")
    public ResponseEntity<List<MovieInfoDTO>> getMoviesByGenre(@PathVariable String genre) {
        List<MovieInfo> movies = movieInfoService.getMoviesByGenre(genre);

        if (movies.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<MovieInfoDTO> movieDTOs = movies.stream().map(movieInfo -> {
            movieInfo.setPoster(encodeUrl(movieInfo.getPoster()));
            return new MovieInfoDTO(
                movieInfo.getMovieId(),
                movieInfo.getTitle(),
                movieInfo.getDescription(),
                movieInfo.getGenre(),
                movieInfo.getFilmCode(),
                movieInfo.getTrailer(),
                movieInfo.getPoster(),
                movieInfo.getRating(),
                movieInfo.getDuration(),
                movieInfo.getFilter()
            );
        }).toList();

        return ResponseEntity.ok(movieDTOs);
    }

    @PutMapping("/updateFilter/{movieID}")
    public ResponseEntity<String> updateMovieFilter(@PathVariable int movieID, @RequestBody Map<String, String> filter) {
        Optional<MovieInfo> optionalMovie = movieInfoService.getMovieInfoById(movieID);

        if (optionalMovie.isPresent()) {
            MovieInfo movie = optionalMovie.get();
            try {
                // Attempt to set the filter from the request body
                movie.setFilter(MovieInfo.MovieFilter.valueOf(filter.get("filter")));
                movieInfoService.saveMovieInfo(movie);
                return ResponseEntity.ok("Movie filter updated successfully");
            } catch (IllegalArgumentException e) {
                // Handle invalid filter value
                return ResponseEntity.badRequest().body("Invalid filter value provided");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
