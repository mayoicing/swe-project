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
    public Optional<Seat> findSeatByAuditoriumAndRowAndNum(int auditoriumID, String seatRow, int seatNum) {
        return seatRepository.findSeatByAuditorium_AuditoriumIDAndSeatRowAndSeatNum(auditoriumID, seatRow, seatNum);
    }
}
