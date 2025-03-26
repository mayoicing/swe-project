package com.movieapp.swe_project_backend.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "movieshow")
public class MovieShow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "movieShowID")
    private int movieShowID;

    @Column(name = "movieID")
    private int movieID;

    @Column(name = "auditoriumID")
    private int auditoriumID;

    @Column(name = "showStartTime")
    private LocalDateTime showStartTime;

    @Column(name = "available_seats")
    @JsonProperty("avaliable_seats")
    private int availableSeats;

    public MovieShow() {}

    public MovieShow(int movieID, int auditoriumID, LocalDateTime showStartTime, int availableSeats) {
        this.movieID = movieID;
        this.auditoriumID = auditoriumID;
        this.showStartTime = showStartTime;
        this.availableSeats = availableSeats;
    }

    public int getMovieShowID() {
        return movieShowID;
    }

    public void setMovieShowID(int movieShowID) {
        this.movieShowID = movieShowID;
    }

    public int getMovieID() {
        return movieID;
    }

    public void setMovieID(int movieID) {
        this.movieID = movieID;
    }

    public int getAuditoriumID() {
        return auditoriumID;
    }

    public void setAuditoriumID(int auditoriumID) {
        this.auditoriumID = auditoriumID;
    }

    public LocalDateTime getShowStartTime() {
        return showStartTime;
    }

    public void setShowStartTime(LocalDateTime showStartTime) {
        this.showStartTime = showStartTime;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }
}