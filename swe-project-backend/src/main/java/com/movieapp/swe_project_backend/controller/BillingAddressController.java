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

import com.movieapp.swe_project_backend.model.BillingAddress;
import com.movieapp.swe_project_backend.service.BillingAddressService;

@RestController
@RequestMapping("/billingaddress")
public class BillingAddressController {

    @Autowired
    private BillingAddressService billingAddressService;

    // ✅ Add Billing Address
    @PostMapping("/add")
    public String addBillingAddress(@RequestBody BillingAddress billingAddress) {
        billingAddressService.saveBillingAddress(billingAddress);
        return "Billing address added successfully!";
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
