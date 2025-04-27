package com.movieapp.swe_project_backend.model.ticket;

public class AdultTicketDecorator extends TicketDecorator {

    public AdultTicketDecorator(TicketComponent decoratedTicket) {
        super(decoratedTicket);
    }

    @Override
    public String getDescription() {
        return decoratedTicket.getDescription() + " (Adult)";
    }
}