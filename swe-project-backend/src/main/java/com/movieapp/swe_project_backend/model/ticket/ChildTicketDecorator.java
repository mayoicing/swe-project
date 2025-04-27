package com.movieapp.swe_project_backend.model.ticket;

public class ChildTicketDecorator extends TicketDecorator {

    public ChildTicketDecorator(TicketComponent decoratedTicket) {
        super(decoratedTicket);
    }

    @Override
    public double getPrice() {
        return decoratedTicket.getPrice() * 0.5f; // 50% discount
    }

    @Override
    public String getDescription() {
        return decoratedTicket.getDescription() + " (Child)";
    }
}
