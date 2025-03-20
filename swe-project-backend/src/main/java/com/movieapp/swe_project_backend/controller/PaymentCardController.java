package com.movieapp.swe_project_backend.controller;

import java.util.HashMap;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movieapp.swe_project_backend.model.PaymentCard;
import com.movieapp.swe_project_backend.repository.PaymentCardRepository;
import com.movieapp.swe_project_backend.service.PaymentCardService;

@RestController
@RequestMapping("/paymentcard")
public class PaymentCardController {

    @Autowired
    private PaymentCardService paymentCardService;

    @Autowired
    private PaymentCardRepository paymentCardRepository;

    // ✅ Add Payment Card
    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addPaymentCard(@RequestBody PaymentCard paymentCard) {
         try {
            PaymentCard savedCard = paymentCardRepository.save(paymentCard);
            Map<String, Object> response = new HashMap<>();
            response.put("cardID", savedCard.getCardID());  // Return cardID to the client
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error saving payment card");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }   
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
