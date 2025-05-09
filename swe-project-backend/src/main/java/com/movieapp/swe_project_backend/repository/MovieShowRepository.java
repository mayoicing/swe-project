package com.movieapp.swe_project_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.movieapp.swe_project_backend.model.MovieShow;

@Repository
public interface MovieShowRepository extends JpaRepository<MovieShow, Integer> {
    List<MovieShow> findByMovieID(int movieID);
    List<MovieShow> findByAuditoriumID(int auditoriumID);
}
