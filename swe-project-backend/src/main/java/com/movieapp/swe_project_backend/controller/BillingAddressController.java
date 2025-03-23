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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movieapp.swe_project_backend.model.BillingAddress;
import com.movieapp.swe_project_backend.model.PaymentCard;
import com.movieapp.swe_project_backend.model.UserInfo;
import com.movieapp.swe_project_backend.service.BillingAddressService;
import com.movieapp.swe_project_backend.service.PaymentCardService;
import com.movieapp.swe_project_backend.service.UserInfoService;


@RestController
@RequestMapping("/billingaddress")
public class BillingAddressController {

    @Autowired
    private BillingAddressService billingAddressService;

    @Autowired
    private PaymentCardService paymentCardService;

    @Autowired
    private UserInfoService userInfoService;

    // ✅ Add Billing Address
    @PostMapping("/add")
    public ResponseEntity<?> addBillingAddress(@RequestBody BillingAddress billingAddress) {
        try {
            System.out.println("Received BillingAddress: " + billingAddress);
            System.out.println("User: " + billingAddress.getUserID()); 

            if (billingAddress.getUserID() == null) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "User is missing in the request");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }   

            Integer cardID = billingAddress.getPaymentCard().getCardID();
            Optional<UserInfo> userOptional = userInfoService.getUserById(billingAddress.getUserID().getUserID());  

            // If user doesn't exist, return a bad request response
            if (userOptional.isEmpty()) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "User not found");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }
    
            UserInfo user = userOptional.get();
            billingAddress.setUserID(user);  // Ensure the billing address is linked to the user

            PaymentCard paymentCard = paymentCardService.getPaymentCardById(cardID).orElse(null);
        
            if (paymentCard == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid cardID"));
            }
            // Set the PaymentCard to the BillingAddress
            billingAddress.setPaymentCard(paymentCard);

            // Save the BillingAddress
            BillingAddress savedBillingAddress = billingAddressService.saveBillingAddress(billingAddress);

            // Prepare the response
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Billing address added successfully!");
            response.put("billingAddressID", savedBillingAddress.getBillingAddressID());
            response.put("cardID", savedBillingAddress.getPaymentCard().getCardID());
            response.put("userID", savedBillingAddress.getUserID().getUserID());

            return ResponseEntity.ok(response);  
        } catch (Exception e) {
            // Handle unexpected errors
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error saving billing address");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }    
    }

    // ✅ Get All Billing Addresses
    @GetMapping("/getAll")
    public List<BillingAddress> getAllBillingAddresses() {
        return billingAddressService.getAllBillingAddresses();
    }

    // ✅ Get Billing Address by ID
    @GetMapping("/get/{id}")
    public Optional<BillingAddress> getBillingAddressById(@PathVariable int id) {
        return billingAddressService.getBillingAddressById(id);
    }

    // ✅ Delete Billing Address by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBillingAddress(@PathVariable int id) {
        billingAddressService.deleteBillingAddressById(id);
        return ResponseEntity.ok("Billing Address deleted successfully.");
    }

    @GetMapping("/user/{userID}")
    public ResponseEntity<List<BillingAddress>> getBillingAddressesByUserID(@PathVariable int userID) {
        try {
            List<BillingAddress> billingAddresses = billingAddressService.getBillingAddressesByUserID(userID);
            if (billingAddresses.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok(billingAddresses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/update/{billingAddressID}")
    public ResponseEntity<?> updateBillingAddress(@PathVariable int billingAddressID, 
                                              @RequestBody BillingAddress updatedAddress,
                                              @RequestHeader("Authorization") String authToken) {
        try {
            // Validate the user through the token and get the userID
            int userID = billingAddressService.getUserIDFromToken(authToken);
        
            // Call the service layer to handle the update logic
            BillingAddress updated = billingAddressService.updateBillingAddress(userID, billingAddressID, updatedAddress);

            // Return the updated address with a success response
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            // Handle any errors (e.g., invalid token, user doesn't own the address, etc.)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error updating billing address: " + e.getMessage());
        }
    }
}
