package com.movieapp.swe_project_backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "billingaddress")
public class BillingAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "billingAddressID", nullable = false)
    private int billingAddressID;

    @OneToOne
    @JoinColumn(name = "paymentCard", nullable = false)
    @JsonProperty("paymentCard")
    private PaymentCard paymentCard;

    @Column(name = "streetAddress", nullable = false)
     @JsonProperty("streetAddress")
    private String streetAddress;

    @Column(name = "city", length = 100, nullable = false)
     @JsonProperty("city")
    private String city;

    @Column(name = "state", length = 50, nullable = false)
     @JsonProperty("state")
    private String state;

    @Column(name = "zip", nullable = false)
     @JsonProperty("zip")
    private int zip;

    // Constructors
    public BillingAddress() {}

    public BillingAddress(PaymentCard paymentCard, String streetAddress, String city, String state, int zip) {
        this.paymentCard = paymentCard;
        this.streetAddress = streetAddress;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    // Getters and Setters
    public int getBillingAddressID() { return billingAddressID; }
    public void setBillingAddressID(int billingAddressID) { this.billingAddressID = billingAddressID; }

    public PaymentCard getPaymentCard() { return paymentCard; }
    public void setPaymentCard(PaymentCard paymentCard) { this.paymentCard = paymentCard; }

    public String getStreetAddress() { return streetAddress; }
    public void setStreetAddress(String streetAddress) { this.streetAddress = streetAddress; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public int getZip() { return zip; }
    public void setZip(int zip) { this.zip = zip; }
}
