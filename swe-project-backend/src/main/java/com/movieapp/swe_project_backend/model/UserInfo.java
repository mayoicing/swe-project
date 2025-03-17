package com.movieapp.swe_project_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userID;

    @Column(nullable = false, length = 100)
    private String first_name;

    @Column(nullable = false, length = 100)
    private String last_name;

    @Column(nullable = false, length = 300, unique = true)
    private String email;

    @Column(nullable = false, length = 200)
    private String password;

    @Column(length = 30)
    private String phone_number;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(nullable = false, columnDefinition = "TINYINT(1) DEFAULT 0")
    private boolean enrollForPromotions;

    @Column
    private int user_type;

    // Enum for status field
    public enum Status {
        Active, Inactive, Suspended
    }

    // Constructor
    public UserInfo(int userID, String first_name, String last_name, String email, String password, 
                    String phone_number, Status status, boolean enrollForPromotions, int user_type) {
        this.userID = userID;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.phone_number = phone_number;
        this.status = status;
        this.enrollForPromotions = enrollForPromotions;
        this.user_type = user_type;
    }

    // Default Constructor
    public UserInfo() {}

    // Getters and Setters
    public int getUserID() { return userID; }
    public void setUserID(int userID) { this.userID = userID; }

    public String getFirstName() { return first_name; }
    public void setFirstName(String first_name) { this.first_name = first_name; }

    public String getLastName() { return last_name; }
    public void setLastName(String last_name) { this.last_name = last_name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPhoneNumber() { return phone_number; }
    public void setPhoneNumber(String phone_number) { this.phone_number = phone_number; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public boolean isEnrollForPromotions() { return enrollForPromotions; }
    public void setEnrollForPromotions(boolean enrollForPromotions) { this.enrollForPromotions = enrollForPromotions; }

    public int getUserType() { return user_type; }
    public void setUserType(int user_type) { this.user_type = user_type; }
}
