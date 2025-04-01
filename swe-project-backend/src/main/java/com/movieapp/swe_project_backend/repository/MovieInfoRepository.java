package com.movieapp.swe_project_backend.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.movieapp.swe_project_backend.model.MovieInfo;

@Repository
public interface MovieInfoRepository extends JpaRepository<MovieInfo, Integer> {
    Optional<MovieInfo> findByTitle(String title);
    
    List<MovieInfo> findByGenreContainingIgnoreCase(String genre);
}
