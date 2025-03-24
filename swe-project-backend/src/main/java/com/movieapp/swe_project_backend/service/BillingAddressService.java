//No implementation file, but can add if needed
package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movieapp.swe_project_backend.model.BillingAddress;
import com.movieapp.swe_project_backend.repository.BillingAddressRepository;

@Service
public class BillingAddressService {

    @Autowired
    private BillingAddressRepository billingAddressRepository;

    @Autowired
    private JwtService jwtService;

    public BillingAddress saveBillingAddress(BillingAddress billingAddress) {
        return billingAddressRepository.save(billingAddress);
    }

    public List<BillingAddress> getAllBillingAddresses() {
        return billingAddressRepository.findAll();
    }

    public Optional<BillingAddress> getBillingAddressById(int id) {
        return billingAddressRepository.findById(id);
    }

    // Delete Billing Address by ID
    public void deleteBillingAddressById(int id) {
        billingAddressRepository.deleteById(id);
    }

    public int getUserIDFromToken(String authToken) throws Exception {
       // Remove 'Bearer ' prefix from the token if it's present
        String token = authToken.startsWith("Bearer ") ? authToken.substring(7) : authToken;

        // Validate the token (optional but recommended)
        if (!jwtService.validateToken(token)) {
            throw new Exception("Invalid or expired token");
        }

        // Extract the userID using JwtService
        return jwtService.extractUserID(token);
    }

     public List<BillingAddress> getBillingAddressesByUserID(int userID) {
        return billingAddressRepository.findBillingAddressesByUserID(userID);
    }

    public BillingAddress updateBillingAddress(int userID, int billingAddressID, BillingAddress updatedAddress) {
        // First, find the billing address by billingAddressID
        BillingAddress existingAddress = billingAddressRepository.findById(billingAddressID)
                .orElseThrow(() -> new RuntimeException("Billing Address not found"));

       // Check if the userID matches the one in the BillingAddress
        if (existingAddress.getUserID().getUserID() != userID) {
            throw new RuntimeException("Unauthorized attempt to update the billing address");
        }

        // Update the address fields with the new data
        if (updatedAddress.getStreetAddress() != null) {
            existingAddress.setStreetAddress(updatedAddress.getStreetAddress());
        }
        if (updatedAddress.getCity() != null) {
            existingAddress.setCity(updatedAddress.getCity());
        }
        if (updatedAddress.getState() != null) {
            existingAddress.setState(updatedAddress.getState());
        }
        if (updatedAddress.getZip() != 0) {
            existingAddress.setZip(updatedAddress.getZip());
        }

        // Save the updated address to the database
        return billingAddressRepository.save(existingAddress);
    }
}
