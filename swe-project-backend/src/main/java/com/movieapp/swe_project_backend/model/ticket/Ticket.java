package com.movieapp.swe_project_backend.model.ticket;

//import com.fasterxml.jackson.annotation.JsonProperty;

import com.movieapp.swe_project_backend.model.Booking;
import com.movieapp.swe_project_backend.model.Seat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "ticket")
public class Ticket implements TicketComponent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticketID")
    private int ticketID;

    @ManyToOne
    @JoinColumn(name = "bookingID", referencedColumnName = "bookingID")
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "seatID", referencedColumnName = "seatID")
    private Seat seat;

    @Column(name = "ticketType")
    private String ticketType;

     // Default Constructor
    public Ticket() {}

    // Constructor
    public Ticket(int ticketID, Booking booking, Seat seat, String ticketType) {
        this.ticketID = ticketID;
        this.booking = booking;
        this.seat = seat;
        this.ticketType = ticketType;
    }

    // Getters and Setters
    public int getTicketID() { return ticketID; }
    public void setTicketID(int ticketID) { this.ticketID = ticketID; }

    public Booking getBooking() { return booking; }
    public void setBooking(Booking booking) { this.booking = booking; }

    public Seat getSeat() { return seat; }
    public void setSeat(Seat seat) { this.seat = seat; }

    public String getTicketType() { return ticketType; }
    public void setTicketType(String ticketType) { this.ticketType = ticketType; }

    @Override
    public double getPrice() {
        return 10.0;
    }

    @Override
    public String getDescription() {
        return "Base Ticket";
    }
}