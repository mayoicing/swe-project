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

import com.movieapp.swe_project_backend.model.Booking;
import com.movieapp.swe_project_backend.service.BookingService;

@RestController
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/add")
    public ResponseEntity<String> addBooking(@RequestBody Booking booking) {
        bookingService.saveBooking(booking);
        return ResponseEntity.ok("Booking created successfully!");
    }

    @GetMapping("/user/{userID}")
    public List<Booking> getBookingByUserId(@PathVariable int userID) {
        return bookingService.getBookingByUserId(userID);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Booking> getBookingsById(@PathVariable int id) {
        Optional<Booking> booking = bookingService.getBookingsById(id);
        return booking.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable int id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.ok("Booking deleted successfully!");
    }
}
