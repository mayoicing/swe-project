package com.movieapp.swe_project_backend.dto;

public class MovieInfoDTO {
    private int movieID;
    private String title;
    private String description;
    private String genre;
    private String filmCode;
    private String trailerUrl;
    private String moviePosterUrl;
    private double movieRating;
    private int movieDuration;

    // Constructor
    public MovieInfoDTO(int movieID, String title, String description, String genre, String filmCode, String trailerUrl, String moviePosterUrl, double movieRating, int movieDuration) {
        this.movieID = movieID;
        this.title = title;
        this.description = description;
        this.genre = genre;
        this.filmCode = filmCode;
        this.trailerUrl = trailerUrl;
        this.moviePosterUrl = moviePosterUrl;
        this.movieRating = movieRating;
        this.movieDuration = movieDuration;
    }

    // Getters and Setters
    public int getMovieID() {
        return movieID;
    }

    public void setMovieID(int movieID) {
        this.movieID = movieID;
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

    public String getTrailerUrl() {
        return trailerUrl;
    }

    public void setTrailerUrl(String trailerUrl) {
        this.trailerUrl = trailerUrl;
    }

    public String getMoviePosterUrl() {
        return moviePosterUrl;
    }

    public void setMoviePosterUrl(String moviePosterUrl) {
        this.moviePosterUrl = moviePosterUrl;
    }

    public double getMovieRating() {
        return movieRating;
    }

    public void setMovieRating(double movieRating) {
        this.movieRating = movieRating;
    }

    public int getMovieDuration() {
        return movieDuration;
    }

    public void setMovieDuration(int movieDuration) {
        this.movieDuration = movieDuration;
    }
}
