package com.movieapp.swe_project_backend.dto;

import java.util.List;

public class SeatSelectionDTO {
    private int auditoriumID;
    private List<String> selectedSeats; // List of seat identifiers (e.g., "A-1", "B-3")

    // Getters and setters
    public int getAuditoriumID() {
        return auditoriumID;
    }

    public void setAuditoriumID(int auditoriumID) {
        this.auditoriumID = auditoriumID;
    }

    public List<String> getSelectedSeats() {
        return selectedSeats;
    }

    public void setSelectedSeats(List<String> selectedSeats) {
        this.selectedSeats = selectedSeats;
    }
}
