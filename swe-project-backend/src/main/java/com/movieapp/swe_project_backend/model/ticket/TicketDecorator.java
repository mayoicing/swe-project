package com.movieapp.swe_project_backend.model.ticket;

public abstract class TicketDecorator implements TicketComponent {
    protected TicketComponent decoratedTicket;

    public TicketDecorator(TicketComponent decoratedTicket) {
        this.decoratedTicket = decoratedTicket;
    }

    @Override
    public double getPrice() {
        return decoratedTicket.getPrice();
    }

    @Override
    public String getDescription() {
        return decoratedTicket.getDescription();
    }
}
