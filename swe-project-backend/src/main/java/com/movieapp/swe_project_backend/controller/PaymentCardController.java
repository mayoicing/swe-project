package com.movieapp.swe_project_backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movieapp.swe_project_backend.model.PaymentCard;
import com.movieapp.swe_project_backend.service.PaymentCardService;

@RestController
@RequestMapping("/paymentcard")
public class PaymentCardController {

    @Autowired
    private PaymentCardService paymentCardService;

    // ✅ Add Payment Card
    @PostMapping("/add")
    public ResponseEntity<String> addPaymentCard(@RequestBody PaymentCard paymentCard) {
        paymentCardService.savePaymentCard(paymentCard);
        return ResponseEntity.ok("Payment Card Added Successfully!");
    }

    // ✅ Get all cards by User ID
    @GetMapping("/user/{userID}")
    public ResponseEntity<List<PaymentCard>> getPaymentCardsByUser(@PathVariable int userID) {
        return ResponseEntity.ok(paymentCardService.getPaymentCardsByUserId(userID));
    }

    // ✅ Get card by Card Number
    @GetMapping("/{cardNumber}")
    public ResponseEntity<PaymentCard> getPaymentCardByNumber(@PathVariable String cardNumber) {
        Optional<PaymentCard> paymentCard = paymentCardService.getPaymentCardByNumber(cardNumber);
        return paymentCard.map(ResponseEntity::ok)
                          .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Delete Payment Card
    @DeleteMapping("/delete/{cardNumber}")
    public ResponseEntity<String> deletePaymentCard(@PathVariable String cardNumber) {
        paymentCardService.deletePaymentCard(cardNumber);
        return ResponseEntity.ok("Payment Card Deleted Successfully!");
    }
}
