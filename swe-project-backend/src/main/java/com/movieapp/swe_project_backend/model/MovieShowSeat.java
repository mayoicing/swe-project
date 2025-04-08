package com.movieapp.swe_project_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "movieshowseat")
public class MovieShowSeat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "movieShowSeatID")
    private int movieShowSeatID;

    @ManyToOne
    @JoinColumn(name = "movieShowID", nullable = false)
    private MovieShow movieShow;

    @ManyToOne
    @JoinColumn(name = "seatID", nullable = false)
    private Seat seat;

    @Enumerated(EnumType.STRING)
    @Column(name = "seatStatus", nullable = false) 
    private SeatStatus seatStatus;

    public enum SeatStatus {
        Available, Unavailable
    }

     // Default Constructor
    public MovieShowSeat() {}

    // Constructor
    public MovieShowSeat(int movieShowSeatID, MovieShow movieShow, Seat seat, SeatStatus seatStatus) {
        this.movieShowSeatID = movieShowSeatID;
        this.movieShow = movieShow;
        this.seat = seat;
        this.seatStatus = seatStatus;
    }

    // Getters and Setters
    public int getMovieShowSeatID() { return movieShowSeatID; }
    public void setMovieShowSeatID(int movieShowSeatID) { this.movieShowSeatID = movieShowSeatID; }

    public MovieShow getMovieShow() { return movieShow; }
    public void setMovieShow(MovieShow movieShow) { this.movieShow = movieShow; }

    public Seat getSeat() { return seat; }
    public void setSeat(Seat seat) { this.seat = seat; }

    public SeatStatus getSeatStatus() { return seatStatus; }
    public void setSeatStatus(SeatStatus seatStatus) { this.seatStatus = seatStatus; }
}