package com.movieapp.swe_project_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ticketType")
public class TicketType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticketTypeID")
    private int ticketTypeID;

    @Enumerated(EnumType.STRING)
    @Column(name = "ticketType", nullable = false) 
    private TicketCategory ticketType;

    @Column(name = "price", nullable = false) 
    private int price;

    public enum TicketCategory {
        Adult, Senior, Child
    }

     // Default Constructor
    public TicketType() {}

    // Constructor
    public TicketType(int ticketTypeID, TicketCategory ticketType, int price) {
        this.ticketTypeID = ticketTypeID;
        this.ticketType = ticketType;
        this.price = price;
    }

    // Getters and Setters
    public int getTicketTypeID() { return ticketTypeID; }
    public void setTicketTypeID(int ticketTypeID) { this.ticketTypeID = ticketTypeID; }

    public TicketCategory getTicketType() { return ticketType; }
    public void setTicketType(TicketCategory ticketType) { this.ticketType = ticketType; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }
}