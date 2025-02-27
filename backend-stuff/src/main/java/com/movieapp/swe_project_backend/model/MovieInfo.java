package com.movieapp.swe_project_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "MovieInfo") // Matches your MySQL table name
public class MovieInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 300)
    private String poster;

    @Column(length = 100)
    private String title;

    @Column(length = 300)
    private String description;

    @Column(length = 100)
    private String category;

    @Column(length = 10)
    private String filmCode;

    @Column(length = 300)
    private String trailer;

    public MovieInfo() {}

    public MovieInfo(String poster, String title, String description, String category, String filmCode, String trailer) {
        this.poster = poster;
        this.title = title;
        this.description = description;
        this.category = category;
        this.filmCode = filmCode;
        this.trailer = trailer;
    }

    public Long getId() { return id; }
    public String getPoster() { return poster; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getCategory() { return category; }
    public String getFilmCode() { return filmCode; }
    public String getTrailer() { return trailer; }

    public void setPoster(String poster) { this.poster = poster; }
    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setCategory(String category) { this.category = category; }
    public void setFilmCode(String filmCode) { this.filmCode = filmCode; }
    public void setTrailer(String trailer) { this.trailer = trailer; }
}