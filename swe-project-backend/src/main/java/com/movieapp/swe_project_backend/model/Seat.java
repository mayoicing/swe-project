package com.movieapp.swe_project_backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "seat")
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seatID")
    private int seatID;

    @ManyToOne
    @JoinColumn(name = "auditoriumID", nullable = false)
    private Auditorium auditorium;

    @Column(name = "seat_row", length = 2, nullable = false)
    @JsonProperty("seat_row")
    private String seatRow;

    @Column(name = "seat_num", nullable = false)
    @JsonProperty("seat_num")
    private int seatNum;

     // Default Constructor
    public Seat() {}

    // Constructor
    public Seat(int seatID, Auditorium auditorium, String seatRow, int seatNum) {
        this.seatID = seatID;
        this.auditorium = auditorium;
        this.seatRow = seatRow;
        this.seatNum = seatNum;
    }

    // Getters and Setters
    public int getSeatID() { return seatID; }
    public void setSeatID(int seatID) { this.seatID = seatID; }

    public Auditorium getAuditorium() { return auditorium; }
    public void setAuditorium(Auditorium auditorium) { this.auditorium = auditorium; }

    public String getSeatRow() { return seatRow; }
    public void setSeatRow(String seatRow) { this.seatRow = seatRow; }

    public int getSeatNum() { return seatNum; }
    public void setSeatNum(int seatNum) { this.seatNum = seatNum; }
}