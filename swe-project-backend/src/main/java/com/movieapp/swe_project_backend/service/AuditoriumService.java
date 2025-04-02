// Service - AuditoriumService.java
package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import com.movieapp.swe_project_backend.model.Auditorium;

public interface AuditoriumService {
    void saveAuditorium(Auditorium auditorium);
    List<Auditorium> getAllAuditoriums();
    Optional<Auditorium> getAuditoriumById(int id);
    Optional<Auditorium> getAuditoriumByName(String name);
    int getTotalSeats(int auditoriumId);
}