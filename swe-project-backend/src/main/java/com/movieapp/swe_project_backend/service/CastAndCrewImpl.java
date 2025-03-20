package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movieapp.swe_project_backend.model.CastAndCrew;
import com.movieapp.swe_project_backend.repository.CastAndCrewRepository;

@Service
public class CastAndCrewImpl implements CastAndCrewService {

    @Autowired
    private CastAndCrewRepository castAndCrewRepository;

    @Override
    public CastAndCrew saveCastAndCrew(CastAndCrew castAndCrew) {
        return castAndCrewRepository.save(castAndCrew);
    }

    @Override
    public List<CastAndCrew> getAllCastAndCrew() {
        return castAndCrewRepository.findAll();
    }

    @Override
    public List<CastAndCrew> getCastAndCrewByMovieID(int movieID) {
        return castAndCrewRepository.findByMovieID(movieID);
    }

    @Override
    public Optional<CastAndCrew> getCastAndCrewById(int id) {
        return castAndCrewRepository.findById(id);
    }

    @Override
    public void deleteCastAndCrew(int id) {
        castAndCrewRepository.deleteById(id);
    }
}
