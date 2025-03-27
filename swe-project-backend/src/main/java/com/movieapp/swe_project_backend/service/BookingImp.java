package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movieapp.swe_project_backend.model.Booking;
import com.movieapp.swe_project_backend.repository.BookingRepository;

@Service
public class BookingImp implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getBookingByUserId(int userID) {
        return bookingRepository.findByUserID(userID);
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