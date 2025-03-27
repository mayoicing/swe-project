package com.movieapp.swe_project_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
//import jakarta.persistence.OneToOne;

@Entity
@Table(name = "booking")
public class Booking{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookingID;

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private UserInfo userID;

    @ManyToOne
    @JoinColumn(name = "movieShowID", nullable = false)
    private MovieShow movieShow;

    @ManyToOne
    @JoinColumn(name = "cardID", nullable = true)
    private PaymentCard paymentCard;

    @Column(name = "noOfTickets")
    private int noOfTickets;

    @Column(name = "totalPrice")
    private float totalPrice;

    @ManyToOne
    @JoinColumn(name = "promoID", nullable = true)
    private PromoCode promoCode;

     // Default Constructor
    public Booking() {}

    // Constructor
    public Booking(UserInfo userID, MovieShow movieShow, PaymentCard paymentCard, int noOfTickets, float totalPrice, PromoCode promoCode) {
        this.userID = userID;
        this.movieShow = movieShow;
        this.paymentCard = paymentCard;
        this.noOfTickets = noOfTickets;
        this.totalPrice = totalPrice;
        this.promoCode = promoCode;
    }

    // Getters and Setters
    public int getBookingID() { return bookingID; }
    public void setBookingID(int bookingID) { this.bookingID = bookingID; }

    public UserInfo getUserID() { return userID; }
    public void setUserID(UserInfo userID) { this.userID = userID; }

    public MovieShow getMovieShow() { return movieShow; }
    public void setMovieShow(MovieShow movieShow) { this.movieShow = movieShow; }

    public PaymentCard getPaymentCard() { return paymentCard; }
    public void setPaymentCard(PaymentCard paymentCard) { this.paymentCard = paymentCard; } 

    public int getNoOfTickets() { return noOfTickets; }
    public void setNoOfTickets(int noOfTickets) { this.noOfTickets = noOfTickets; }

    public float getTotalPrice() { return totalPrice; }
    public void setTotalPrice(float totalPrice) { this.totalPrice = totalPrice; }

    public PromoCode getPromoCode() { return promoCode; }
    public void setPromoCode(PromoCode promoCode) { this.promoCode = promoCode; }
}