package com.movieapp.swe_project_backend.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "users") // ✅ Table name remains as 'users'
public class UserInfo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userID") // ✅ Explicitly mapped
    private int userID;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private final List<PaymentCard> paymentCards = new ArrayList<>();

    @Column(name = "first_name", nullable = false, length = 100) // ✅ Maps to 'first_name'
    @JsonProperty("first_name")
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 100) // ✅ Maps to 'last_name'
    @JsonProperty("last_name")
    private String lastName;

    @Column(name = "email", nullable = false, length = 300, unique = true)
    private String email;

    @Column(name = "password", nullable = false, length = 200)
    private String password;

    @Column(name = "phone_number", length = 30) // ✅ Maps to 'phone_number'
    @JsonProperty("phone_number")
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false) // ✅ Maps to 'status'
    private Status status;

    @Column(name = "enroll_for_promotions", nullable = false) // ✅ Maps to 'enroll_for_promotions'
    @JsonProperty("enroll_for_promotions")
    private boolean enrollForPromotions;

    @Column(name = "user_type", nullable = false) // ✅ Maps to 'user_type'
    @JsonProperty("user_type")
    private int userType;

    public enum Status {
        Active, Inactive, Suspended
    }

    // ✅ Default Constructor (Auto-sets default values)
    public UserInfo() {
        this.status = Status.Active;
        this.enrollForPromotions = false;
    }

    // ✅ Auto-set default values before saving to database
    @PrePersist
    protected void onCreate() {
        if (this.status == null) {
            this.status = Status.Active;
        }
        if (!this.enrollForPromotions) {
            this.enrollForPromotions = false;
        }
    }

    // ✅ Full Constructor
    public UserInfo(int userID, String firstName, String lastName, String email, String password, 
                    String phoneNumber, Status status, boolean enrollForPromotions, int userType) {
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.status = (status != null) ? status : Status.Active;
        this.enrollForPromotions = enrollForPromotions;
        this.userType = userType;
    }

    // ✅ Getters and Setters
    
    public List<PaymentCard> getPaymentCards() {
        return paymentCards;
    }
    public int getUserID() { return userID; }
    public void setUserID(int userID) { this.userID = userID; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public boolean isEnrollForPromotions() { return enrollForPromotions; }
    public void setEnrollForPromotions(boolean enrollForPromotions) { this.enrollForPromotions = enrollForPromotions; }

    public int getUserType() { return userType; }
    public void setUserType(int userType) { this.userType = userType; }
}
