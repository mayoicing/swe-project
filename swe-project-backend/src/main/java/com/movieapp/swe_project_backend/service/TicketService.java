package com.movieapp.swe_project_backend.service;

import com.movieapp.swe_project_backend.model.ticket.*;

import java.util.List;
import java.util.Optional;

public interface TicketService {
    Ticket saveTicket(Ticket ticket);
    List<Ticket> getAllTickets();
    Optional<TicketComponent> getTicketById(int ticketID);
    void deleteTicket(int ticketID);
}
