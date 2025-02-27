package com.movieapp.swe_project_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class MovieInfo {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;
    private String poster;
    private String title;
    private String description;
    private String category;
    private String filmCode;
    private String trailer;

    // Constructor
    public MovieInfo(int id, String poster, String title, String description, String category, String filmCode, String trailer) {
        this.id = id;
        this.poster = poster;
        this.title = title;
        this.description = description;
        this.category = category;
        this.filmCode = filmCode;
        this.trailer = trailer;
    }

    // Default Constructor
    public MovieInfo() {}

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getFilmCode() {
        return filmCode;
    }

    public void setFilmCode(String filmCode) {
        this.filmCode = filmCode;
    }

    public String getTrailer() {
        return trailer;
    }

    public void setTrailer(String trailer) {
        this.trailer = trailer;
    }

    // toString method
    @Override
    public String toString() {
        return "MovieInfo{" +
                "id=" + id +
                ", poster='" + poster + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", category='" + category + '\'' +
                ", filmCode='" + filmCode + '\'' +
                ", trailer='" + trailer + '\'' +
                '}';
    }
}