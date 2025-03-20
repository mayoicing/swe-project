package com.movieapp.swe_project_backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_types")  // Matches DB table name exactly
public class UserType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_typeid")  // Matches DB column
    @JsonProperty("user_typeid")   // Ensures JSON uses snake_case
    private int userTypeId;

    @Column(name = "user_type_name")  // Matches DB column
    @JsonProperty("user_type_name")   // Ensures JSON uses snake_case
    private int userTypeName;

    // Default Constructor
    public UserType() {}

    // Constructor
    public UserType(int userTypeName) {
        this.userTypeName = userTypeName;
    }

    // Getters and Setters
    public int getUserTypeId() {
        return userTypeId;
    }

    public void setUserTypeId(int userTypeId) {
        this.userTypeId = userTypeId;
    }

    public int getUserTypeName() {
        return userTypeName;
    }

    public void setUserTypeName(int userTypeName) {
        this.userTypeName = userTypeName;
    }
}
