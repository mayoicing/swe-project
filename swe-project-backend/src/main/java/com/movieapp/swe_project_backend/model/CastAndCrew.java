package com.movieapp.swe_project_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "castandcrew")  // Matches database table
public class CastAndCrew {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "castAndCrewID")
    private int castAndCrewID;

    @Column(name = "movieID", nullable = false)
    private int movieID;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    // Enum for roles
    public enum Role {
        Actor, Director, Producer
    }

    // Constructors
    public CastAndCrew() {}

    public CastAndCrew(int movieID, String name, Role role) {
        this.movieID = movieID;
        this.name = name;
        this.role = role;
    }

    // Getters and Setters
    public int getCastAndCrewID() { return castAndCrewID; }
    public void setCastAndCrewID(int castAndCrewID) { this.castAndCrewID = castAndCrewID; }

    public int getMovieID() { return movieID; }
    public void setMovieID(int movieID) { this.movieID = movieID; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}
