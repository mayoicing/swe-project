// Model - Auditorium.java
package com.movieapp.swe_project_backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Auditorium {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auditoriumID")
    private int auditoriumID;

    @Column(name = "auditorium_name")
    @JsonProperty("auditorium_name")
    private String auditoriumName;

    @Column(name = "noOfSeats")
    @JsonProperty("noOfSeats")
    private int noOfSeats;

    public Auditorium() {}

    public Auditorium(String auditoriumName, int noOfSeats) {
        this.auditoriumName = auditoriumName;
        this.noOfSeats = noOfSeats;
    }

    public int getAuditoriumID() {
        return auditoriumID;
    }

    public void setAuditoriumID(int auditoriumID) {
        this.auditoriumID = auditoriumID;
    }

    public String getAuditoriumName() {
        return auditoriumName;
    }

    public void setAuditoriumName(String auditoriumName) {
        this.auditoriumName = auditoriumName;
    }

    public int getNoOfSeats() {
        return noOfSeats;
    }

    public void setNoOfSeats(int noOfSeats) {
        this.noOfSeats = noOfSeats;
    }
}
