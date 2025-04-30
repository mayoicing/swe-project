package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movieapp.swe_project_backend.model.Auditorium;
import com.movieapp.swe_project_backend.model.Booking;
import com.movieapp.swe_project_backend.model.MovieInfo;
import com.movieapp.swe_project_backend.repository.BookingRepository;

@Service
public class BookingImp implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private MovieInfoService movieInfoService;

    @Autowired
    private AuditoriumService auditoriumService;

    @Override
    public Booking saveBooking(Booking booking) {
        Booking saved = bookingRepository.save(booking);

        try {
            Optional<Booking> fullBookingOpt = bookingRepository.findByIdWithDetails(saved.getBookingID());
            if (fullBookingOpt.isEmpty()) throw new RuntimeException("Booking not found for email.");

            Booking full = fullBookingOpt.get();

            if (full.getUser() == null || full.getMovieShow() == null) {
                throw new RuntimeException("User or MovieShow is null");
            }

            String userEmail = full.getUser().getEmail();
            String userName = full.getUser().getFirstName();
            String movieTitle = movieInfoService
                .getMovieInfoById(full.getMovieShow().getMovieID())
                .map(MovieInfo::getTitle)
                .orElse("Unknown Movie");
            String auditoriumName = auditoriumService
                .getAuditoriumById(full.getMovieShow().getAuditoriumID())
                .map(Auditorium::getAuditoriumName)
                .orElse("Unknown Auditorium");
            int ticketCount = full.getNoOfTickets();
            float totalPrice = full.getTotalPrice();
            String promoCode = full.getPromoCode() != null ? full.getPromoCode().getCode() : "None";

            if (userEmail != null && !userEmail.isBlank()) {
                emailService.sendBookingConfirmationEmail(
                    userEmail,
                    userName,
                    movieTitle,
                    auditoriumName,
                    ticketCount,
                    totalPrice,
                    promoCode
                );
            } else {
                System.err.println("⚠️ Skipped sending email: user email is null or blank.");
            }
        } catch (Exception e) {
            System.err.println("⚠️ Failed to send booking confirmation email: " + e.getMessage());
        }

        return saved;
    }

    @Override
    public List<Booking> getBookingByUserId(int userID) {
        return bookingRepository.findByUserUserID(userID);
    }

    @Override
    public Optional<Booking> getBookingsById(int bookingID) {
        return bookingRepository.findById(bookingID);
    }

    @Override
    public void deleteBooking(int bookingID) {
        bookingRepository.deleteById(bookingID);
    }
}
