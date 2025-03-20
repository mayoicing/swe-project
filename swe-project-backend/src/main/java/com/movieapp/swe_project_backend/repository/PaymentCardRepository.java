package com.movieapp.swe_project_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.movieapp.swe_project_backend.model.PaymentCard;

@Repository
public interface PaymentCardRepository extends JpaRepository<PaymentCard, String> {
    List<PaymentCard> findByUserUserID(int userID); // Get all cards by user ID
}
