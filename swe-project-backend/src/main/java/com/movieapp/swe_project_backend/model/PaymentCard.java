package com.movieapp.swe_project_backend.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "paymentcard") 
public class PaymentCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremented ID
    @Column(name = "CardID")
    private int CardID;  // Primary Key

    @Column(name = "cardNumber", length = 255, nullable = false)
    private String cardNumber;  // Encrypted card number

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false) 
    private UserInfo user;

    @Column(name = "cardholderName", length = 100, nullable = false) 
    private String cardholderName;

    @Enumerated(EnumType.STRING)
    @Column(name = "cardType", nullable = false) 
    private CardType cardType;

    @Column(name = "expDate", nullable = false) 
    private Date expDate;

    @Column(name = "cvv", nullable = false) 
    private int cvv;

    public enum CardType {
        Credit, Debit
    }

    // ✅ Default Constructor
    public PaymentCard() {}

    // ✅ Constructor
    public PaymentCard(String cardNumber, UserInfo user, String cardholderName, CardType cardType, Date expDate, int cvv) {
        this.cardNumber = cardNumber;
        this.user = user;
        this.cardholderName = cardholderName;
        this.cardType = cardType;
        this.expDate = expDate;
        this.cvv = cvv;
    }

    // ✅ Getters and Setters
    public int getCardID() { return CardID; }
    public void setCardID(int CardID) { this.CardID = CardID; }

    public String getCardNumber() { return cardNumber; }
    public void setCardNumber(String cardNumber) { this.cardNumber = cardNumber; }

    public UserInfo getUser() { return user; }
    public void setUser(UserInfo user) { this.user = user; }

    public String getCardholderName() { return cardholderName; }
    public void setCardholderName(String cardholderName) { this.cardholderName = cardholderName; } 

    public CardType getCardType() { return cardType; }
    public void setCardType(CardType cardType) { this.cardType = cardType; }

    public Date getExpDate() { return expDate; }
    public void setExpDate(Date expDate) { this.expDate = expDate; }

    public int getCvv() { return cvv; }
    public void setCvv(int cvv) { this.cvv = cvv; }
}
