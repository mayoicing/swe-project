package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movieapp.swe_project_backend.model.PaymentCard;
import com.movieapp.swe_project_backend.repository.PaymentCardRepository;

@Service
public class PaymentCardImp implements PaymentCardService {

    @Autowired
    private PaymentCardRepository paymentCardRepository;

    @Override
    public PaymentCard savePaymentCard(PaymentCard paymentCard) {
        return paymentCardRepository.save(paymentCard);
    }

    @Override
    public List<PaymentCard> getPaymentCardsByUserId(int userID) {
        return paymentCardRepository.findByUserUserID(userID);
    }

    @Override
    public Optional<PaymentCard> getPaymentCardByNumber(String cardNumber) {
        return paymentCardRepository.findById(cardNumber);
    }

    @Override
    public void deletePaymentCard(String cardNumber) {
        paymentCardRepository.deleteById(cardNumber);
    }
}
