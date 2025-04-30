// DTO - BookingDTO.java
package com.movieapp.swe_project_backend.dto;

import java.time.LocalDateTime;

public class BookingDTO {
    private int bookingID;
    private String movieTitle;
    private LocalDateTime showStartTime;
    private int noOfTickets;
    private float totalPrice;
    private String promoCode;

    public BookingDTO() {}

    public BookingDTO(int bookingID, String movieTitle, LocalDateTime showStartTime,
                      int noOfTickets, float totalPrice, String promoCode) {
        this.bookingID = bookingID;
        this.movieTitle = movieTitle;
        this.showStartTime = showStartTime;
        this.noOfTickets = noOfTickets;
        this.totalPrice = totalPrice;
        this.promoCode = promoCode;
    }

    public int getBookingID() {
        return bookingID;
    }

    public void setBookingID(int bookingID) {
        this.bookingID = bookingID;
    }

    public String getMovieTitle() {
        return movieTitle;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }

    public LocalDateTime getShowStartTime() {
        return showStartTime;
    }

    public void setShowStartTime(LocalDateTime showStartTime) {
        this.showStartTime = showStartTime;
    }

    public int getNoOfTickets() {
        return noOfTickets;
    }

    public void setNoOfTickets(int noOfTickets) {
        this.noOfTickets = noOfTickets;
    }

    public float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getPromoCode() {
        return promoCode;
    }

    public void setPromoCode(String promoCode) {
        this.promoCode = promoCode;
    }
}
