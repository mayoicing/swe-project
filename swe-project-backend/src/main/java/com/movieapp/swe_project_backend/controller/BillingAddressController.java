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
            if (billingAddress.getUserID() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "User is missing in the request"));
            }

            Integer cardID = billingAddress.getPaymentCard().getCardID();
            Optional<UserInfo> userOptional = userInfoService.getUserById(billingAddress.getUserID().getUserID());

            if (userOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "User not found"));
            }

            UserInfo user = userOptional.get();
            billingAddress.setUserID(user);

            PaymentCard paymentCard = paymentCardService.getPaymentCardById(cardID).orElse(null);
            if (paymentCard == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid cardID"));
            }
            billingAddress.setPaymentCard(paymentCard);

            BillingAddress savedBillingAddress = billingAddressService.saveBillingAddress(billingAddress);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Billing address added successfully!");
            response.put("billingAddressID", savedBillingAddress.getBillingAddressID());
            response.put("cardID", savedBillingAddress.getPaymentCard().getCardID());
            response.put("userID", savedBillingAddress.getUserID().getUserID());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Error saving billing address"));
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

    // ✅ Create or Update Billing Address for a User
    @PutMapping("/update")
    public ResponseEntity<?> createOrUpdateBillingAddress(@RequestBody BillingAddress newAddress) {
        try {
            if (newAddress.getUserID() == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "User is missing"));
            }

            Integer userId = newAddress.getUserID().getUserID();
            Optional<UserInfo> userOpt = userInfoService.getUserById(userId);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found"));
            }

            UserInfo user = userOpt.get();
            List<BillingAddress> existingAddresses = billingAddressService.getBillingAddressesByUserID(userId);

            BillingAddress addressToSave;
            if (!existingAddresses.isEmpty()) {
                // Update existing address
                BillingAddress existing = existingAddresses.get(0);
                existing.setStreetAddress(newAddress.getStreetAddress());
                existing.setCity(newAddress.getCity());
                existing.setState(newAddress.getState());
                existing.setZip(newAddress.getZip());
                addressToSave = existing;
            } else {
                // Create new address
                newAddress.setUserID(user);
                addressToSave = newAddress;
            }

            BillingAddress saved = billingAddressService.saveBillingAddress(addressToSave);
            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to update or create billing address"));
        }
    }
}