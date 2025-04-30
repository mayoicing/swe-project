package com.movieapp.swe_project_backend.service;

import com.movieapp.swe_project_backend.model.ticket.*;
import com.movieapp.swe_project_backend.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
//import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketImp implements TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Override
    public Ticket saveTicket(Ticket ticket) {
        System.out.println("Saving ticket: " + ticket); 
        try {
            Ticket savedTicket = ticketRepository.save(ticket);
            System.out.println("Ticket saved successfully: " + savedTicket); 
            return savedTicket;
        } catch (Exception e) {
            System.out.println("Error saving ticket: " + ticket); 
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error saving ticket", e);
        }
    }

    @Override
    public List<Ticket> getAllTickets() {
         System.out.println("Fetching all tickets");
        try {
            List<Ticket> tickets = ticketRepository.findAll();
            System.out.println("Tickets fetched successfully: " + tickets.size());
            return tickets;
        } catch (Exception e) {
            System.out.println("Error fetching all tickets"); 
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error fetching tickets", e);
        }
    }

    @Override
    public Optional<TicketComponent> getTicketById(int ticketID) {
       System.out.println("Fetching ticket with ID: " + ticketID);
        try {
            Optional<Ticket> ticket = ticketRepository.findById(ticketID);
            if (ticket.isPresent()) {
                System.out.println("Ticket found: " + ticket.get());
                return Optional.of(decorateTicket(ticket.get()));
            } else {
                System.out.println("Ticket with ID " + ticketID + " not found");
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket with ID " + ticketID + " not found");
            }
        } catch (Exception e) {
            System.out.println("Error fetching ticket with ID: " + ticketID);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error fetching ticket", e);
        }
    }

    @Override
    public void deleteTicket(int ticketID) {
        ticketRepository.deleteById(ticketID);
    }

    private TicketComponent decorateTicket(Ticket ticket) {
        System.out.println("Decorating ticket: " + ticket); 
        TicketComponent baseTicket = ticket;
        switch (ticket.getTicketType()) {
            case "Adult":
                System.out.println("Decorating as Adult Ticket");
                return new AdultTicketDecorator(baseTicket);
            case "Child":
                System.out.println("Decorating as Child Ticket");
                return new ChildTicketDecorator(baseTicket);
            case "Senior":
                System.out.println("Decorating as Senior Ticket");
                return new SeniorTicketDecorator(baseTicket);
            default:
                System.out.println("No decoration applied");
                return baseTicket; // no decoration
        }
    }
}
