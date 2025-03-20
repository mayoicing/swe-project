package com.movieapp.swe_project_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "promocodes")
public class PromoCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "promoID")
    private int promoID;

    @Column(name = "code", length = 20, nullable = false, unique = true)
    private String code;

    @Column(name = "discount", nullable = false)
    private int discount;

    // ✅ Default Constructor
    public PromoCode() {}

    // ✅ Constructor
    public PromoCode(String code, int discount) {
        this.code = code;
        this.discount = discount;
    }

    // ✅ Getters and Setters
    public int getPromoID() { return promoID; }
    public void setPromoID(int promoID) { this.promoID = promoID; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public int getDiscount() { return discount; }
    public void setDiscount(int discount) { this.discount = discount; }
}
