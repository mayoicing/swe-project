package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.amazonaws.services.kms.AWSKMS;
import com.amazonaws.services.kms.AWSKMSClientBuilder;
import com.amazonaws.services.kms.model.DecryptRequest;
import com.amazonaws.services.kms.model.EncryptRequest;
import com.amazonaws.services.kms.model.EncryptResult;
import com.amazonaws.services.kms.model.DecryptResult;
import org.springframework.beans.factory.annotation.Value;
import java.nio.ByteBuffer;
import java.util.stream.Collectors;
import com.movieapp.swe_project_backend.model.PaymentCard;
import com.movieapp.swe_project_backend.repository.PaymentCardRepository;
import org.springframework.transaction.annotation.Transactional;
import com.movieapp.swe_project_backend.util.EncryptionUtil;

@Service
public class PaymentCardImp implements PaymentCardService {
    private final AWSKMS kmsClient;

    @Value("${aws.kms.keyId}") // Injecting the key ID from the application properties
    private String kmsKeyId;

    @Autowired
    private PaymentCardRepository paymentCardRepository;

    public PaymentCardImp() {
        this.kmsClient = AWSKMSClientBuilder.defaultClient(); // Default KMS client
    }

    @Transactional 
    @Override
    public PaymentCard savePaymentCard(PaymentCard paymentCard) {   
        try {
            // Encrypt the card number using KMS
            ByteBuffer encryptedData = encryptData(paymentCard.getCardNumber());
            String encryptedCardNumber = Base64.getEncoder().encodeToString(encryptedData.array());
             //paymentCard.setCardNumber(encryptedData.toString());
            paymentCard.setCardNumber(encryptedCardNumber);
        } catch (Exception e) {
            throw new RuntimeException("Error encrypting card data", e);
        }
        
        return paymentCardRepository.save(paymentCard);
    }

    private ByteBuffer encryptData(String data) {
        EncryptRequest encryptRequest = new EncryptRequest()
            .withKeyId(kmsKeyId)
            .withPlaintext(ByteBuffer.wrap(data.getBytes()));
        EncryptResult encryptResult = kmsClient.encrypt(encryptRequest);
        return encryptResult.getCiphertextBlob();
    }

    @Override
    public List<PaymentCard> getPaymentCardsByUserId(int userID) {
        List<PaymentCard> encryptedCards = paymentCardRepository.findByUserUserID(userID);
        
        // Decrypt the card numbers before returning
        return encryptedCards.stream().map(card -> {
            try {
                card.setCardNumber(decryptData(card.getCardNumber()));
            } catch (Exception e) {
                throw new RuntimeException("Error decrypting card data", e);
            }
            return card;
        }).collect(Collectors.toList());
        
       //return encryptedCards;
    }

    private String decryptData(String encryptedData) {
        // Assuming encryptedData is stored as a Base64 encoded string
        ByteBuffer encryptedByteBuffer = ByteBuffer.wrap(Base64.getDecoder().decode(encryptedData));
        
        DecryptRequest decryptRequest = new DecryptRequest().withCiphertextBlob(encryptedByteBuffer);
        DecryptResult decryptResult = kmsClient.decrypt(decryptRequest);
        return new String(decryptResult.getPlaintext().array());
    }

    @Override
    public Optional<PaymentCard> getPaymentCardById(int paymentCardID) {
        return paymentCardRepository.findById(paymentCardID).map(card -> {
           
            try {
                // Decrypt before returning
                card.setCardNumber(decryptData(card.getCardNumber()));
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
