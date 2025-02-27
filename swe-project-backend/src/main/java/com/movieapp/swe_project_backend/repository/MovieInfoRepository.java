package com.movieapp.swe_project_backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.movieapp.swe_project_backend.model.MovieInfo;

@Repository
public interface MovieInfoRepository extends JpaRepository<MovieInfo, Integer> {

    
}
