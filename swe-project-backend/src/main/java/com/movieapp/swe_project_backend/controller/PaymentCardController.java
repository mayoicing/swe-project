package com.movieapp.swe_project_backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
    public PaymentCard addPaymentCard(@RequestBody PaymentCard paymentCard) {
        return paymentCardService.savePaymentCard(paymentCard);
    }

    // ✅ Get Payment Cards by User ID
    @GetMapping("/user/{userID}")
    public List<PaymentCard> getPaymentCardsByUserId(@PathVariable int userID) {
        return paymentCardService.getPaymentCardsByUserId(userID);
    }

    // ✅ Get Payment Card by paymentCardID
    @GetMapping("/{paymentCardID}")
    public Optional<PaymentCard> getPaymentCardById(@PathVariable int paymentCardID) {
        return paymentCardService.getPaymentCardById(paymentCardID);
    }

    // ✅ Delete Payment Card by paymentCardID
    @DeleteMapping("/delete/{paymentCardID}")
    public String deletePaymentCard(@PathVariable int paymentCardID) {
        paymentCardService.deletePaymentCard(paymentCardID);
        return "Payment Card deleted successfully!";
    }
}
