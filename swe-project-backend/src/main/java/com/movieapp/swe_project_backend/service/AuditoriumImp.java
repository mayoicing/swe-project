package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movieapp.swe_project_backend.model.Auditorium;
import com.movieapp.swe_project_backend.repository.AuditoriumRepository;

@Service
public class AuditoriumImp implements AuditoriumService {

    @Autowired
    private AuditoriumRepository repository;

    @Override
    public void saveAuditorium(Auditorium auditorium) {
        repository.save(auditorium);
    }

    @Override
    public List<Auditorium> getAllAuditoriums() {
        return repository.findAll();
    }

    @Override
    public Optional<Auditorium> getAuditoriumById(int id) {
        return repository.findById(id);
    }

    @Override
    public Optional<Auditorium> getAuditoriumByName(String name) {
        return repository.findByAuditoriumName(name);
    }
}