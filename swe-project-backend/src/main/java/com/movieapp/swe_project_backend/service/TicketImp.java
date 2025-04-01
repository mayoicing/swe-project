package com.movieapp.swe_project_backend.service;

import com.movieapp.swe_project_backend.model.Ticket;
import com.movieapp.swe_project_backend.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketImp implements TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Override
    public Ticket saveTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    @Override
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    @Override
    public Optional<Ticket> getTicketById(int ticketID) {
       return ticketRepository.findById(ticketID);
    }

    @Override
    public void deleteTicket(int ticketID) {
        ticketRepository.deleteById(ticketID);
    }
}
