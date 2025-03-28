package com.movieapp.swe_project_backend.model;

//import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.*;

@Entity
@Table(name = "ticket")
public class Ticket {
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

    @ManyToOne
    @JoinColumn(name = "ticketTypeID", referencedColumnName = "ticketTypeID")
    private TicketType ticketType;

     // Default Constructor
    public Ticket() {}

    // Constructor
    public Ticket(int ticketID, Booking booking, Seat seat, TicketType ticketType) {
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

    public TicketType getTicketType() { return ticketType; }
    public void setTicketType(TicketType ticketType) { this.ticketType = ticketType; }
}