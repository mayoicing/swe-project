package com.movieapp.swe_project_backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movieapp.swe_project_backend.model.Auditorium;
import com.movieapp.swe_project_backend.service.AuditoriumService;

@RestController
@RequestMapping("/auditorium")
public class AuditoriumController {

    @Autowired
    private AuditoriumService auditoriumService;

    @PostMapping("/add")
    public ResponseEntity<String> addAuditorium(@RequestBody Auditorium auditorium) {
        auditoriumService.saveAuditorium(auditorium);
        return ResponseEntity.ok("Auditorium added successfully");
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Auditorium>> getAllAuditoriums() {
        return ResponseEntity.ok(auditoriumService.getAllAuditoriums());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Auditorium> getAuditoriumById(@PathVariable int id) {
        Optional<Auditorium> auditorium = auditoriumService.getAuditoriumById(id);
        return auditorium.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/get/name/{name}")
    public ResponseEntity<Auditorium> getAuditoriumByName(@PathVariable String name) {
        Optional<Auditorium> auditorium = auditoriumService.getAuditoriumByName(name);
        return auditorium.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
