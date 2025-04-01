// Service - AuditoriumService.java
package com.movieapp.swe_project_backend.service;

import com.movieapp.swe_project_backend.model.Auditorium;

import java.util.List;
import java.util.Optional;

public interface AuditoriumService {
    void saveAuditorium(Auditorium auditorium);
    List<Auditorium> getAllAuditoriums();
    Optional<Auditorium> getAuditoriumById(int id);
    Optional<Auditorium> getAuditoriumByName(String name);
}