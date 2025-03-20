package com.movieapp.swe_project_backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

import com.movieapp.swe_project_backend.model.BillingAddress;
import com.movieapp.swe_project_backend.model.PaymentCard;
import com.movieapp.swe_project_backend.service.BillingAddressService;
import com.movieapp.swe_project_backend.service.PaymentCardService;

@RestController
@RequestMapping("/billingaddress")
public class BillingAddressController {

    @Autowired
    private BillingAddressService billingAddressService;

    @Autowired
    private PaymentCardService paymentCardService;

    // ✅ Add Billing Address
    @PostMapping("/add")
    public ResponseEntity<?> addBillingAddress(@RequestBody BillingAddress billingAddress) {
       Integer cardID = billingAddress.getPaymentCard().getCardID();

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

        return ResponseEntity.ok(response);      
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
}
