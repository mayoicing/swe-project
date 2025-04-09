package com.movieapp.swe_project_backend.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movieapp.swe_project_backend.model.MovieInfo;
import com.movieapp.swe_project_backend.model.MovieShow;
import com.movieapp.swe_project_backend.repository.MovieInfoRepository;
import com.movieapp.swe_project_backend.repository.MovieShowRepository;

@Service
public class MovieShowImp implements MovieShowService {

    @Autowired
    private MovieShowRepository movieShowRepository;

    @Autowired
    private MovieInfoRepository movieInfoRepository;

    @Override
    public MovieShow saveMovieShow(MovieShow newShow) {
        MovieInfo movie = movieInfoRepository.findById(newShow.getMovieID())
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        int duration = movie.getDuration(); // in minutes
        LocalDateTime newStart = newShow.getShowStartTime();
        LocalDateTime newEnd = newStart.plusMinutes(duration);

        List<MovieShow> existingShows = movieShowRepository.findByAuditoriumID(newShow.getAuditoriumID());

        for (MovieShow existing : existingShows) {
            MovieInfo existingMovie = movieInfoRepository.findById(existing.getMovieID())
                    .orElseThrow(() -> new RuntimeException("Movie not found for existing show"));

            LocalDateTime existingStart = existing.getShowStartTime();
            LocalDateTime existingEnd = existingStart.plusMinutes(existingMovie.getDuration());

            boolean isOverlapping = newStart.isBefore(existingEnd) && newEnd.isAfter(existingStart);

            if (isOverlapping) {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("h:mm a");
                String formattedStart = existingStart.format(formatter);
                String formattedEnd = existingEnd.format(formatter);

                throw new RuntimeException(
                    "❌ Conflict: \"" + existingMovie.getTitle() + "\" is already scheduled\n" +
                    "at " + formattedStart + "–" + formattedEnd + " in Auditorium " + newShow.getAuditoriumID()
                );
            }
        }

        return movieShowRepository.save(newShow);
    }

    @Override
    public List<MovieShow> getAllMovieShows() {
        return movieShowRepository.findAll();
    }

    @Override
    public Optional<MovieShow> getMovieShowById(int id) {
        return movieShowRepository.findById(id);
    }

    @Override
    public List<MovieShow> getShowsByMovieId(int movieId) {
        return movieShowRepository.findByMovieID(movieId);
    }

    @Override
    public void deleteMovieShow(int id) {
        movieShowRepository.deleteById(id);
    }
}
