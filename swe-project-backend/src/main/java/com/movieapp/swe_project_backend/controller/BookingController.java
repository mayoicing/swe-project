// BookingController.java
package com.movieapp.swe_project_backend.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movieapp.swe_project_backend.dto.BookingDTO;
import com.movieapp.swe_project_backend.model.Auditorium;
import com.movieapp.swe_project_backend.model.Booking;
import com.movieapp.swe_project_backend.model.MovieInfo;
import com.movieapp.swe_project_backend.service.AuditoriumService;
import com.movieapp.swe_project_backend.service.BookingService;
import com.movieapp.swe_project_backend.service.MovieInfoService;

@RestController
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private MovieInfoService movieInfoService;

    @Autowired
    private AuditoriumService auditoriumService;

    @PostMapping("/add")
    public ResponseEntity<?> addBooking(@RequestBody Booking booking) {
        Booking saved = bookingService.saveBooking(booking);
        return ResponseEntity.ok().body(java.util.Map.of("bookingID", saved.getBookingID()));
    }

    @GetMapping("/user/{userID}")
    public List<Booking> getBookingByUserId(@PathVariable int userID) {
        return bookingService.getBookingByUserId(userID);
    }

    @GetMapping("/user-history/{userID}")
    public ResponseEntity<List<BookingDTO>> getBookingHistoryByUserId(@PathVariable int userID) {
        List<Booking> bookings = bookingService.getBookingByUserId(userID);

        List<BookingDTO> dtos = bookings.stream().map(b -> {
            String movieTitle = movieInfoService.getMovieInfoById(b.getMovieShow().getMovieID())
                .map(MovieInfo::getTitle).orElse("Unknown Movie");

            String auditoriumName = auditoriumService.getAuditoriumById(b.getMovieShow().getAuditoriumID())
                .map(Auditorium::getAuditoriumName).orElse("Auditorium");

            String promoCode = b.getPromoCode() != null ? b.getPromoCode().getCode() : null;

            BookingDTO dto = new BookingDTO();
            dto.setBookingID(b.getBookingID());
            dto.setMovieTitle(movieTitle + " - " + auditoriumName);
            dto.setShowStartTime(b.getMovieShow().getShowStartTime());
            dto.setNoOfTickets(b.getNoOfTickets());
            dto.setTotalPrice(b.getTotalPrice());
            dto.setPromoCode(promoCode);

            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
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