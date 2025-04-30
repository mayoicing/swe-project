package com.movieapp.swe_project_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.movieapp.swe_project_backend.model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    List<Booking> findByUserUserID(int userID);

    // Eagerly fetch related entities for safe access post-save
    @Query("SELECT b FROM Booking b " +
           "JOIN FETCH b.user " +
           "JOIN FETCH b.movieShow " +
           "LEFT JOIN FETCH b.promoCode " +
           "WHERE b.bookingID = :bookingID")
    Optional<Booking> findByIdWithDetails(@Param("bookingID") int bookingID);
}
