package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import com.movieapp.swe_project_backend.model.Seat;

public interface SeatService {
    Seat saveSeat(Seat seat);
    List<Seat> getAllSeats();
    List<Seat> getSeatsByAuditorium(int auditoriumID);
    Optional<Seat> getSeatById(int seatID);
    void deleteSeat(int seatID);
    void updateSeatStatus(int auditoriumID, List<String> selectedSeats);
    Optional<Seat> findSeatByAuditoriumAndRowAndNum(int auditoriumID, String seatRow, int seatNum);
}
