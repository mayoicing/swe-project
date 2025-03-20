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

    public BillingAddress saveBillingAddress(BillingAddress billingAddress) {
        return billingAddressRepository.save(billingAddress);
    }

    public List<BillingAddress> getAllBillingAddresses() {
        return billingAddressRepository.findAll();
    }

    public Optional<BillingAddress> getBillingAddressById(int id) {
        return billingAddressRepository.findById(id);
    }
}
