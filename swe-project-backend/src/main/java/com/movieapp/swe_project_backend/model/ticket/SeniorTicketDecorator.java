package com.movieapp.swe_project_backend.model.ticket;

public class SeniorTicketDecorator extends TicketDecorator {

    public SeniorTicketDecorator(TicketComponent decoratedTicket) {
        super(decoratedTicket);
    }

    @Override
    public double getPrice() {
        return decoratedTicket.getPrice() * 0.7f; // 30% discount
    }

    @Override
    public String getDescription() {
        return decoratedTicket.getDescription() + " (Senior)";
    }
}