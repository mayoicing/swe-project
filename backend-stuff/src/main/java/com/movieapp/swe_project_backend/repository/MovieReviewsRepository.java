package com.movieapp.swe_project_backend.repository;
import com.movieapp.swe_project_backend.model.MovieReviews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieReviewsRepository extends JpaRepository<MovieReviews, Long> {
}
