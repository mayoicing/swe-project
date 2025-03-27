package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import com.movieapp.swe_project_backend.model.Booking;

public interface BookingService {
    Booking saveBooking(Booking booking);
    List<Booking> getBookingByUserId(int userID);
    Optional<Booking> getBookingsById(int bookingID); 
    void deleteBooking(int bookingID);
}