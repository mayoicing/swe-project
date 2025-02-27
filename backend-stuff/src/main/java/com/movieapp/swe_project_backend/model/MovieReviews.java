package com.movieapp.swe_project_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "MovieReviews") // Matches your MySQL table name
public class MovieReviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "movie_id", referencedColumnName = "id")
    private MovieInfo movie; // Foreign key reference to MovieInfo

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Reviewer reviewerName;

    @Column
    private Integer score;

    public enum Reviewer {
        Tomatometer, Audience
    }

    public MovieReviews() {}

    public MovieReviews(MovieInfo movie, Reviewer reviewerName, Integer score) {
        this.movie = movie;
        this.reviewerName = reviewerName;
        this.score = score;
    }

    public Long getId() { return id; }
    public MovieInfo getMovie() { return movie; }
    public Reviewer getReviewerName() { return reviewerName; }
    public Integer getScore() { return score; }

    public void setMovie(MovieInfo movie) { this.movie = movie; }
    public void setReviewerName(Reviewer reviewerName) { this.reviewerName = reviewerName; }
    public void setScore(Integer score) { this.score = score; }
}