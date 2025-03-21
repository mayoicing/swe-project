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

    // ✅ Add Payment Card
    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addPaymentCard(@RequestBody PaymentCard paymentCard) {
         try {
            // Check if user exists using the userID from the paymentCard object
            System.out.println("Received PaymentCard: " + paymentCard);
            System.out.println("User: " + paymentCard.getUser()); 

            if (paymentCard.getUser() == null) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "User is missing in the request");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }   
            
            Optional<UserInfo> userOptional = userInfoService.getUserById(paymentCard.getUser().getUserID());

            // If user doesn't exist, return a bad request response
            if (userOptional.isEmpty()) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "User not found");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }
            
            // Set the user from the database to ensure it's valid
            UserInfo user = userOptional.get();
            paymentCard.setUser(user);  // Ensure the paymentCard is linked to the user

            System.out.println("Payment Card will be saved for User: " + user.getUserID());

            // Save the payment card
            PaymentCard savedCard = paymentCardService.savePaymentCard(paymentCard);
            
            // Prepare the response with the cardID
            Map<String, Object> response = new HashMap<>();
            response.put("cardID", savedCard.getCardID());  // Return cardID to the client

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Handle unexpected errors
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
