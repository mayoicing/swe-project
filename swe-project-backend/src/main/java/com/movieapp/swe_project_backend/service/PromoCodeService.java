package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import com.movieapp.swe_project_backend.model.PromoCode;

public interface PromoCodeService {
    PromoCode savePromoCode(PromoCode promoCode);
    List<PromoCode> getAllPromoCodes();
    Optional<PromoCode> getPromoCodeById(int promoID);
    Optional<PromoCode> getPromoCodeByCode(String code);
    void deletePromoCode(int promoID);
}
