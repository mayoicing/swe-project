package com.movieapp.swe_project_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "CastAndCrew") // Matches your MySQL table name
public class CastAndCrew {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long castAndCrewId;

    @ManyToOne
    @JoinColumn(name = "movie_id", referencedColumnName = "id")
    private MovieInfo movie; // Foreign key reference to MovieInfo

    @Column(length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    public enum Role {
        Actor, Director, Producer
    }

    public CastAndCrew() {}

    public CastAndCrew(MovieInfo movie, String name, Role role) {
        this.movie = movie;
        this.name = name;
        this.role = role;
    }

    public Long getCastAndCrewId() { return castAndCrewId; }
    public MovieInfo getMovie() { return movie; }
    public String getName() { return name; }
    public Role getRole() { return role; }

    public void setMovie(MovieInfo movie) { this.movie = movie; }
    public void setName(String name) { this.name = name; }
    public void setRole(Role role) { this.role = role; }
}