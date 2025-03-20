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

import com.movieapp.swe_project_backend.model.PromoCode;
import com.movieapp.swe_project_backend.service.PromoCodeService;

@RestController
@RequestMapping("/promocode")
public class PromoCodeController {

    @Autowired
    private PromoCodeService promoCodeService;

    // ✅ Add a Promo Code
    @PostMapping("/add")
    public ResponseEntity<String> addPromoCode(@RequestBody PromoCode promoCode) {
        promoCodeService.savePromoCode(promoCode);
        return ResponseEntity.ok("Promo Code added successfully!");
    }

    // ✅ Get All Promo Codes
    @GetMapping("/getAll")
    public List<PromoCode> getAllPromoCodes() {
        return promoCodeService.getAllPromoCodes();
    }

    // ✅ Get Promo Code by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getPromoCodeById(@PathVariable int id) {
        Optional<PromoCode> promoCode = promoCodeService.getPromoCodeById(id);
        return promoCode.map(ResponseEntity::ok)
                        .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Get Promo Code by Code
    @GetMapping("/getByCode/{code}")
    public ResponseEntity<?> getPromoCodeByCode(@PathVariable String code) {
        Optional<PromoCode> promoCode = promoCodeService.getPromoCodeByCode(code);
        return promoCode.map(ResponseEntity::ok)
                        .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Delete a Promo Code
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePromoCode(@PathVariable int id) {
        promoCodeService.deletePromoCode(id);
        return ResponseEntity.ok("Promo Code deleted successfully!");
    }
}
