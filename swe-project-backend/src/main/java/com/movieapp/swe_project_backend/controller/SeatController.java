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

import com.movieapp.swe_project_backend.model.Seat;
import com.movieapp.swe_project_backend.service.SeatService;

@RestController
@RequestMapping("/seat")
public class SeatController {

    @Autowired
    private SeatService seatService;

    @PostMapping("/add")
    public ResponseEntity<String> addSeat(@RequestBody Seat seat) {
        seatService.saveSeat(seat);
        return ResponseEntity.ok("Seat added successfully!");
    }

    @GetMapping("/getAll")
    public List<Seat> getAllSeats() {
        return seatService.getAllSeats();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Seat> getSeatById(@PathVariable int id) {
        Optional<Seat> seat = seatService.getSeatById(id);
        return seat.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/auditorium/{auditoriumID}")
    public List<Seat> getSeatsByAuditorium(@PathVariable int auditoriumID) {
        return seatService.getSeatsByAuditorium(auditoriumID);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSeat(@PathVariable int id) {
        seatService.deleteSeat(id);
        return ResponseEntity.ok("Seat deleted successfully!");
    }
}