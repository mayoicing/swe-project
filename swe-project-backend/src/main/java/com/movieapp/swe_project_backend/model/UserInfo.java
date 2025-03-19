package com.movieapp.swe_project_backend.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class UserInfo implements Serializable {

    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userID;

    @Column(nullable = false, length = 100)
    private String firstName;

    @Column(nullable = false, length = 100)
    private String lastName;

    @Column(nullable = false, length = 300, unique = true)
    private String email;

    @Column(nullable = false, length = 200)
    private String password;

    @Column(length = 30)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(nullable = false)
    private boolean enrollForPromotions;

    @Column(nullable = false)
    private int userType;

    // Enum for status field
    public enum Status {
        Active, Inactive, Suspended
    }

    // ✅ Default Constructor (Auto-sets default values)
    public UserInfo() {
        this.status = Status.Active;
        this.enrollForPromotions = false;
        this.userType = 2;
    }

    // ✅ Auto-set default values before saving to database
    @PrePersist
    protected void onCreate() {
        if (this.status == null) {
            this.status = Status.Active;
        }
        if (this.enrollForPromotions == false) {
            this.enrollForPromotions = false;
        }
        if (this.userType == 0) {
            this.userType = 2;
        }
    }

    // ✅ Full Constructor (For Manual Object Creation)
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

    // Getters and Setters
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
