package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movieapp.swe_project_backend.model.TicketType;
import com.movieapp.swe_project_backend.repository.TicketTypeRepository;

@Service
public class TicketTypeImp implements TicketTypeService {

    @Autowired
    private TicketTypeRepository ticketTypeRepository;

    @Override
    public TicketType saveTicketType(TicketType ticketType) {
        return ticketTypeRepository.save(ticketType);
    }

    @Override
    public List<TicketType> getAllTicketTypes() {
        return ticketTypeRepository.findAll();
    }

    @Override
    public Optional<TicketType> getTicketTypeById(int ticketTypeID) {
        return ticketTypeRepository.findById(ticketTypeID);
    }

    @Override
    public void deleteTicketType(int ticketTypeID) {
        ticketTypeRepository.deleteById(ticketTypeID);
    }
}
