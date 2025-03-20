package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import com.movieapp.swe_project_backend.model.PaymentCard;

public interface PaymentCardService {
    PaymentCard savePaymentCard(PaymentCard paymentCard);
    List<PaymentCard> getPaymentCardsByUserId(int userID);
    Optional<PaymentCard> getPaymentCardById(int paymentCardID); // Changed from cardNumber to paymentCardID
    void deletePaymentCard(int paymentCardID); // Changed from cardNumber to paymentCardID
}
