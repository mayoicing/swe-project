package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import com.movieapp.swe_project_backend.model.TicketType;

public interface TicketTypeService {
    TicketType saveTicketType(TicketType ticketType);
    List<TicketType> getAllTicketTypes();
    Optional<TicketType> getTicketTypeById(int ticketTypeID);
    void deleteTicketType(int ticketTypeID);
}
