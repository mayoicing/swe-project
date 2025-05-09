package com.movieapp.swe_project_backend.controller;

import com.movieapp.swe_project_backend.model.ticket.*;
import com.movieapp.swe_project_backend.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ticket")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping("/add")
    public ResponseEntity<String> addTicket(@RequestBody Ticket ticket) {
        ticketService.saveTicket(ticket);
        return ResponseEntity.ok("Ticket added successfully!");
    }

    @GetMapping("/getAll")
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<TicketComponent> getTicketById(@PathVariable int id) {
        Optional<TicketComponent> ticket = ticketService.getTicketById(id);
        return ticket
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                                            .body(null)); // Return null for TicketComponent when not found
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTicket(@PathVariable int id) {
        ticketService.deleteTicket(id);
        return ResponseEntity.ok("Ticket deleted successfully!");
    }
}
