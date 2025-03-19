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

    @Column(nullable = false, length = 100, name = "first_name")
    private String first_name;

    @Column(nullable = false, length = 100, name = "last_name")
    private String last_name;

    @Column(nullable = false, length = 300, unique = true, name = "email")
    private String email;

    @Column(nullable = false, length = 200, name="password")
    private String password;

    @Column(length = 30, name="phone_number")
    private String phone_number;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(nullable = false, name="enroll_for_promotions")
    private boolean enroll_for_promotions;

    @Column(nullable = false, name="user_type")
    private int user_type;

    // Enum for status field
    public enum Status {
        Active, Inactive, Suspended
    }

    // ✅ Default Constructor (Auto-sets default values)
    public UserInfo() {
        this.status = Status.Active;
        this.enroll_for_promotions = false;
        this.user_type = 2;
    }

    // ✅ Auto-set default values before saving to database
    @PrePersist
    protected void onCreate() {
        if (this.status == null) {
            this.status = Status.Active;
        }
        if (this.enroll_for_promotions == false) {
            this.enroll_for_promotions = false;
        }
        if (this.user_type == 0) {
            this.user_type = 2;
        }
    }

    // ✅ Full Constructor (For Manual Object Creation)
    public UserInfo(int userID, String first_name, String last_name, String email, String password, 
                    String phone_number, Status status, boolean enroll_for_promotions, int user_type) {
        this.userID = userID;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.phone_number = phone_number;
        this.status = (status != null) ? status : Status.Active;
        this.enroll_for_promotions = enroll_for_promotions;
        this.user_type = user_type;
    }

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

    public boolean isEnrollForPromotions() { return enroll_for_promotions; }
    public void setEnrollForPromotions(boolean enroll_for_promotions) { this.enroll_for_promotions = enroll_for_promotions; }

    public int getUserType() { return user_type; }
    public void setUserType(int user_type) { this.user_type = user_type; }
}
