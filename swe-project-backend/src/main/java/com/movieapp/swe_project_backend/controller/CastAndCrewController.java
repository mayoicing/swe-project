package com.movieapp.swe_project_backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movieapp.swe_project_backend.model.CastAndCrew;
import com.movieapp.swe_project_backend.service.CastAndCrewService;

@RestController
@RequestMapping("/castandcrew")
public class CastAndCrewController {

    @Autowired
    private CastAndCrewService castAndCrewService;

    // ✅ Add Cast or Crew Member
    @PostMapping("/add")
    public ResponseEntity<String> addCastAndCrew(@RequestBody CastAndCrew castAndCrew) {
        castAndCrewService.saveCastAndCrew(castAndCrew);
        return ResponseEntity.ok("Cast/Crew member added successfully!");
    }

    // ✅ Get All Cast and Crew Members
    @GetMapping("/getAll")
    public List<CastAndCrew> getAllCastAndCrew() {
        return castAndCrewService.getAllCastAndCrew();
    }

    // ✅ Get Cast and Crew by Movie ID
    @GetMapping("/get/movie/{movieID}")
    public List<CastAndCrew> getCastAndCrewByMovieID(@PathVariable int movieID) {
        return castAndCrewService.getCastAndCrewByMovieID(movieID);
    }

    // ✅ Get Cast or Crew Member by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<CastAndCrew> getCastAndCrewById(@PathVariable int id) {
        Optional<CastAndCrew> castAndCrew = castAndCrewService.getCastAndCrewById(id);
        return castAndCrew.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Delete Cast or Crew Member
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCastAndCrew(@PathVariable int id) {
        castAndCrewService.deleteCastAndCrew(id);
        return ResponseEntity.ok("Cast/Crew member deleted successfully!");
    }
}
