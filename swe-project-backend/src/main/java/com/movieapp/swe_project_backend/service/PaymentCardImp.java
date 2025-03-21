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
            // 🔒 Encrypt the card number before saving
            String encryptedCardNumber = EncryptionUtil.encrypt(paymentCard.getCardNumber());
            paymentCard.setCardNumber(encryptedCardNumber);

            System.out.println("🔐 Saving encrypted card number: " + encryptedCardNumber);
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
                card.setCardNumber(decryptedCardNumber);

                System.out.println("🔓 Decrypted card number: " + decryptedCardNumber);
            } catch (Exception e) {
                throw new RuntimeException("Error decrypting card data", e);
            }
            return card;
        }).collect(Collectors.toList());
    }

    @Override
    public Optional<PaymentCard> getPaymentCardById(int paymentCardID) {
        return paymentCardRepository.findById(paymentCardID).map(card -> {
            try {
                String decryptedCardNumber = EncryptionUtil.decrypt(card.getCardNumber());
                card.setCardNumber(decryptedCardNumber);

                System.out.println("🔓 Decrypted single card number: " + decryptedCardNumber);
            } catch (Exception e) {
                throw new RuntimeException("Error decrypting card data", e);
            }
            return card;
        });
    }

    @Override
    public void deletePaymentCard(int paymentCardID) {
        paymentCardRepository.deleteById(paymentCardID);
    }
}
