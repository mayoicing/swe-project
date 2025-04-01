package com.movieapp.swe_project_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "movieinfo")
public class MovieInfo {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int movieID;

    @Column(columnDefinition="TEXT")
    private String poster;
    private String title;
    private String description;
    private String genre;
    private String filmCode;
    private String trailer;
    private double rating;
    private int duration;

    // Constructor
    public MovieInfo(int movieID, String poster, String title, String description, String genre, String filmCode, String trailer, double rating, int duration) {
        this.movieID = movieID;
        //this.movieID = movieID;
        this.poster = poster;
        this.title = title;
        this.description = description;
        this.genre = genre;
        this.filmCode = filmCode;
        this.trailer = trailer;
        this.rating = rating;
        this.duration = duration;
    }

    // Default Constructor
    public MovieInfo() {}

    // Getters and Setters
    public int getMovieId() {
        return movieID;
    }

    public void setMovieId(int movieID) {
        this.movieID = movieID;
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

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
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

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }   

    // toString method
    @Override
    public String toString() {
        return "MovieInfo{" +
                "movieID=" + movieID +
                ", poster='" + poster + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", genre='" + genre + '\'' +
                ", filmCode='" + filmCode + '\'' +
                ", trailer='" + trailer + '\'' +
                ", rating=" + rating +
                ", duration=" + duration +
                '}';
    }
}