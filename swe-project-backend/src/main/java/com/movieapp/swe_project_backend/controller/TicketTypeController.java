package com.movieapp.swe_project_backend.controller;

import com.movieapp.swe_project_backend.model.TicketType;
import com.movieapp.swe_project_backend.service.TicketTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ticketType")
public class TicketTypeController {

    @Autowired
    private TicketTypeService ticketTypeService;

    @PostMapping("/add")
    public ResponseEntity<String> addTicketType(@RequestBody TicketType ticketType) {
        ticketTypeService.saveTicketType(ticketType);
        return ResponseEntity.ok("Ticket type added successfully!");
    }

    @GetMapping("/getAll")
    public List<TicketType> getAllTicketTypes() {
        return ticketTypeService.getAllTicketTypes();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<TicketType> getTicketTypeById(@PathVariable int id) {
        Optional<TicketType> ticketType = ticketTypeService.getTicketTypeById(id);
        return ticketType.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTicketType(@PathVariable int id) {
        ticketTypeService.deleteTicketType(id);
        return ResponseEntity.ok("Ticket type deleted successfully!");
    }
}
