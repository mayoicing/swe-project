package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.movieapp.swe_project_backend.model.PaymentCard;
import com.movieapp.swe_project_backend.repository.PaymentCardRepository;
import com.movieapp.swe_project_backend.util.EncryptionUtil;

@Service
public class PaymentCardImp implements PaymentCardService {

    @Autowired
    private PaymentCardRepository paymentCardRepository;

    @Transactional 
    @Override
    public PaymentCard savePaymentCard(PaymentCard paymentCard) {
        try {
            // 🔍 Debug Log: Check received data
            System.out.println("Received Card Data (Before Encryption): " + paymentCard.getCardNumber());

            // Ensure the card is not already encrypted before encrypting
            if (!paymentCard.getCardNumber().contains("=")) { // Base64 encrypted strings contain '='
                String encryptedCardNumber = EncryptionUtil.encrypt(paymentCard.getCardNumber());
                paymentCard.setCardNumber(encryptedCardNumber);
                System.out.println("Saving Encrypted Card Number: " + encryptedCardNumber);
            } else {
                System.out.println("Data already encrypted, skipping encryption.");
            }

        } catch (Exception e) {
            throw new RuntimeException("Error encrypting card data", e);
        }
        return paymentCardRepository.save(paymentCard);
    }

    @Override
    public List<PaymentCard> getPaymentCardsByUserId(int userID) {
        List<PaymentCard> encryptedCards = paymentCardRepository.findByUserUserID(userID);

        return encryptedCards.stream().map(card -> {
            try {
                String decryptedCardNumber = EncryptionUtil.decrypt(card.getCardNumber());
                System.out.println("🔓 Decrypted card number: " + decryptedCardNumber);

                // Create a separate response object
                PaymentCard responseCard = new PaymentCard(
                    decryptedCardNumber,
                    card.getUser(),
                    card.getCardholderName(),
                    card.getCardType(),
                    card.getExpDate(),
                    card.getCvv()
                );
                responseCard.setCardID(card.getCardID()); // Keep original ID
                return responseCard;

            } catch (Exception e) {
                throw new RuntimeException("Error decrypting card data", e);
            }
        }).collect(Collectors.toList());
    }

    @Override
    public Optional<PaymentCard> getPaymentCardById(int paymentCardID) {
        return paymentCardRepository.findById(paymentCardID).map(card -> {
            try {
                String decryptedCardNumber = EncryptionUtil.decrypt(card.getCardNumber());
                System.out.println("Decrypted single card number: " + decryptedCardNumber);

                // Create a separate response object
                PaymentCard responseCard = new PaymentCard(
                    decryptedCardNumber,
                    card.getUser(),
                    card.getCardholderName(),
                    card.getCardType(),
                    card.getExpDate(),
                    card.getCvv()
                );
                responseCard.setCardID(card.getCardID()); // Keep original ID
                return responseCard;

            } catch (Exception e) {
                throw new RuntimeException("Error decrypting card data", e);
            }
        });
    }

    @Override
    public void deletePaymentCard(int paymentCardID) {
        paymentCardRepository.deleteById(paymentCardID);
    }
}