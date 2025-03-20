package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import com.movieapp.swe_project_backend.model.CastAndCrew;

public interface CastAndCrewService {
    CastAndCrew saveCastAndCrew(CastAndCrew castAndCrew);
    List<CastAndCrew> getAllCastAndCrew();
    List<CastAndCrew> getCastAndCrewByMovieID(int movieID);
    Optional<CastAndCrew> getCastAndCrewById(int id);
    void deleteCastAndCrew(int id);
}
