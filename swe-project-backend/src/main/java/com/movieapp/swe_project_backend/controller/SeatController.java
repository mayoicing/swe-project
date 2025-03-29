package com.movieapp.swe_project_backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movieapp.swe_project_backend.dto.SeatSelectionDTO;
import com.movieapp.swe_project_backend.model.Seat;
import com.movieapp.swe_project_backend.service.SeatService;

@RestController
@RequestMapping("/seat")
public class SeatController {

    @Autowired
    private SeatService seatService;

    @PostMapping("/add")
    public ResponseEntity<String> addSeat(@RequestBody Seat seat) {
        seatService.saveSeat(seat);
        return ResponseEntity.ok("Seat added successfully!");
    }

    @GetMapping("/getAll")
    public List<Seat> getAllSeats() {
        return seatService.getAllSeats();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Seat> getSeatById(@PathVariable int id) {
        Optional<Seat> seat = seatService.getSeatById(id);
        return seat.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/auditorium/{auditoriumID}")
    public List<Seat> getSeatsByAuditorium(@PathVariable int auditoriumID) {
        return seatService.getSeatsByAuditorium(auditoriumID);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSeat(@PathVariable int id) {
        seatService.deleteSeat(id);
        return ResponseEntity.ok("Seat deleted successfully!");
    }

    @PostMapping("/updateSeatStatus")
    public ResponseEntity<Map<String, String>> updateSeatStatus(@RequestBody SeatSelectionDTO request) {
        // Extract auditoriumID and selectedSeats from the request
        int auditoriumID = request.getAuditoriumID();
        List<String> selectedSeats = request.getSelectedSeats();

        // Create a response map to send back as JSON
        Map<String, String> response = new HashMap<>();

       // Example: Loop through selected seats and update their status
        for (String seatIdentifier : selectedSeats) {
            String[] seatParts = seatIdentifier.split("-");
            String seatRow = seatParts[0]; // e.g., "A"
            int seatNum = Integer.parseInt(seatParts[1]); // e.g., "1"

            Optional<Seat> seat = seatService.findSeatByAuditoriumAndRowAndNum(auditoriumID, seatRow, seatNum);
        
            if (seat.isPresent()) {
                Seat foundSeat = seat.get();
                foundSeat.setSeatStatus(Seat.SeatStatus.Unavailable);
                seatService.saveSeat(foundSeat);  // Save the updated seat
            } else {
                // Handle the case where the seat wasn't found
                response.put("message", "Seat " + seatIdentifier + " not found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        }
        response.put("message", "Seat status updated successfully!");
        return ResponseEntity.ok(response);  
    } 
}