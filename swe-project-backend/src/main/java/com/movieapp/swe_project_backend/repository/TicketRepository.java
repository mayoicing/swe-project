package com.movieapp.swe_project_backend.repository;

import com.movieapp.swe_project_backend.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    // Custom queries can be added here if necessary
}
