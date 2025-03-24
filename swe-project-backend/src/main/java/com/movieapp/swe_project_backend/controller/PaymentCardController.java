package com.movieapp.swe_project_backend.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movieapp.swe_project_backend.model.PaymentCard;
import com.movieapp.swe_project_backend.model.UserInfo;
import com.movieapp.swe_project_backend.service.PaymentCardService;
import com.movieapp.swe_project_backend.service.UserInfoService;

@RestController
@RequestMapping("/paymentcard")
public class PaymentCardController {

    @Autowired
    private PaymentCardService paymentCardService;

    @Autowired
    private UserInfoService userInfoService;

    // Add Payment Card
    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addPaymentCard(@RequestBody PaymentCard paymentCard) {
        try {
            if (paymentCard.getUser() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "User is missing in the request"));
            }

            Optional<UserInfo> userOptional = userInfoService.getUserById(paymentCard.getUser().getUserID());

            if (userOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "User not found"));
            }

            UserInfo user = userOptional.get();
            paymentCard.setUser(user);

            PaymentCard savedCard = paymentCardService.savePaymentCard(paymentCard);

            return ResponseEntity.ok(Map.of("cardID", savedCard.getCardID()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error saving payment card"));
        }
    }

    // Get Payment Cards by User ID
    @GetMapping("/user/{userID}")
    public List<PaymentCard> getPaymentCardsByUserId(@PathVariable int userID) {
        return paymentCardService.getPaymentCardsByUserId(userID);
    }

    // Get Payment Card by paymentCardID
    @GetMapping("/{paymentCardID}")
    public Optional<PaymentCard> getPaymentCardById(@PathVariable int paymentCardID) {
        return paymentCardService.getPaymentCardById(paymentCardID);
    }

    // Delete Payment Card by paymentCardID
    @DeleteMapping("/delete/{paymentCardID}")
    public String deletePaymentCard(@PathVariable int paymentCardID) {
        paymentCardService.deletePaymentCard(paymentCardID);
        return "Payment Card deleted successfully!";
    }

    // Update Payment Card
    @PutMapping("/update")
    public ResponseEntity<String> updatePaymentCard(@RequestBody PaymentCard updatedCard) {
        try {
            Optional<PaymentCard> cardOpt = paymentCardService.getPaymentCardById(updatedCard.getCardID());
            if (cardOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Card not found");
            }

            PaymentCard card = cardOpt.get();
            card.setCardholderName(updatedCard.getCardholderName());
            card.setCardNumber(updatedCard.getCardNumber());
            card.setExpDate(updatedCard.getExpDate());
            card.setCardType(updatedCard.getCardType());
            card.setCvv(updatedCard.getCvv());

            paymentCardService.savePaymentCard(card);
            return ResponseEntity.ok("Card updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update card: " + e.getMessage());
        }
    }
}
