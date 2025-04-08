package com.movieapp.swe_project_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import com.movieapp.swe_project_backend.model.MovieShowSeat;
import com.movieapp.swe_project_backend.service.MovieShowSeatService;

@RestController
@RequestMapping("/movieshowseat")
public class MovieShowSeatController {
    @Autowired
    private MovieShowSeatService movieShowSeatService;

    @GetMapping("/unavailable/{movieShowID}")
    public List<MovieShowSeat> getUnavailableSeats(@PathVariable int movieShowID) {
        return movieShowSeatService.getUnavailableSeatsByMovieShow(movieShowID);
    }

    @PostMapping("/initialize/{movieShowID}/{auditoriumID}")
    public ResponseEntity<?> initializeSeats(@PathVariable int movieShowID, @PathVariable int auditoriumID) {
        try {
            List<MovieShowSeat> seats = movieShowSeatService.initializeSeatsForMovieShow(movieShowID, auditoriumID);
            return ResponseEntity.ok(seats); // Return the list of created seats
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error initializing seats: " + e.getMessage());
        }
    }

    @PutMapping("/update/{movieShowSeatID}")
    public void updateSeatStatus(@PathVariable int movieShowSeatID, @RequestParam String status) {
        movieShowSeatService.updateSeatStatus(movieShowSeatID, status);
    }

    @DeleteMapping("/delete/byMovieShow/{movieShowID}")
    public ResponseEntity<String> deleteSeatsByMovieShow(@PathVariable int movieShowID) {
        movieShowSeatService.deleteSeatsByMovieShowID(movieShowID);
        return ResponseEntity.ok("Seats deleted successfully for MovieShow ID: " + movieShowID);
    }
}