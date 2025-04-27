package com.movieapp.swe_project_backend.service;

import com.movieapp.swe_project_backend.model.ticket.*;
import com.movieapp.swe_project_backend.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class TicketImp implements TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Override
    public Ticket saveTicket(Ticket ticket) {
        log.info("Saving ticket: {}", ticket); // Info log when saving a ticket
        try {
            Ticket savedTicket = ticketRepository.save(ticket);
            log.info("Ticket saved successfully: {}", savedTicket); // Log success
            return savedTicket;
        } catch (Exception e) {
            log.error("Error saving ticket: {}", ticket, e); // Log error
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error saving ticket", e);
        }
    }

    @Override
    public List<Ticket> getAllTickets() {
         log.info("Fetching all tickets");
        try {
            List<Ticket> tickets = ticketRepository.findAll();
            log.info("Tickets fetched successfully: {}", tickets.size());
            return tickets;
        } catch (Exception e) {
            log.error("Error fetching all tickets", e); // Log error
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error fetching tickets", e);
        }
    }

    @Override
    public Optional<TicketComponent> getTicketById(int ticketID) {
       log.info("Fetching ticket with ID: {}", ticketID);
        try {
            Optional<Ticket> ticket = ticketRepository.findById(ticketID);
            if (ticket.isPresent()) {
                log.info("Ticket found: {}", ticket.get());
                return Optional.of(decorateTicket(ticket.get()));
            } else {
                log.warn("Ticket with ID {} not found", ticketID); // Warn if not found
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket with ID " + ticketID + " not found");
            }
        } catch (Exception e) {
            log.error("Error fetching ticket with ID: {}", ticketID, e); // Log error
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error fetching ticket", e);
        }
    }

    @Override
    public void deleteTicket(int ticketID) {
        ticketRepository.deleteById(ticketID);
    }

    private TicketComponent decorateTicket(Ticket ticket) {
        log.debug("Decorating ticket: {}", ticket);
        TicketComponent baseTicket = ticket;
        switch (ticket.getTicketType()) {
            case "Adult":
                log.debug("Decorating as Adult Ticket");
                return new AdultTicketDecorator(baseTicket);
            case "Child":
                log.debug("Decorating as Child Ticket");
                return new ChildTicketDecorator(baseTicket);
            case "Senior":
                log.debug("Decorating as Senior Ticket");
                return new SeniorTicketDecorator(baseTicket);
            default:
                log.debug("No decoration applied");
                return baseTicket; // no decoration
        }
    }
}
