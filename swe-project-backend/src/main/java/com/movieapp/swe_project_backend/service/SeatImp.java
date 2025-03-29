package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movieapp.swe_project_backend.model.Seat;
import com.movieapp.swe_project_backend.repository.SeatRepository;

@Service
public class SeatImp implements SeatService {

    @Autowired
    private SeatRepository seatRepository;

    @Override
    public Seat saveSeat(Seat seat) {
        return seatRepository.save(seat);
    }

    @Override
    public List<Seat> getAllSeats() {
        return seatRepository.findAll();
    }

    @Override
    public List<Seat> getSeatsByAuditorium(int auditoriumID) {
        return seatRepository.findByAuditoriumAuditoriumID(auditoriumID);
    }

    @Override
    public Optional<Seat> getSeatById(int seatID) {
        return seatRepository.findById(seatID);
    }

    @Override
    public void deleteSeat(int seatID) {
        seatRepository.deleteById(seatID);
    }
    
    @Override
    public void updateSeatStatus(int auditoriumID, List<String> selectedSeats) {
        // Fetch all seats for the given auditorium
        List<Seat> seats = seatRepository.findByAuditoriumAuditoriumID(auditoriumID);

        // Update the availability of the selected seats
        for (Seat seat : seats) {
            // If the seat is in the list of selected seats, mark it as unavailable
            String seatIdentifier = seat.getSeatRow() + "-" + seat.getSeatNum(); // Example: "A-1"
            if (selectedSeats.contains(seatIdentifier)) {
                seat.setSeatStatus(Seat.SeatStatus.Unavailable);
            }
        }

        // Save the updated seat statuses to the database
        seatRepository.saveAll(seats);
    }

    @Override
    public Optional<Seat> findSeatByAuditoriumAndRowAndNum(int auditoriumID, String seatRow, int seatNum) {
        return seatRepository.findSeatByAuditorium_AuditoriumIDAndSeatRowAndSeatNum(auditoriumID, seatRow, seatNum);
    }
}
