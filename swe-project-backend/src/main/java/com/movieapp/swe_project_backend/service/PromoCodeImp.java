package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movieapp.swe_project_backend.model.PromoCode;
import com.movieapp.swe_project_backend.model.UserInfo;
import com.movieapp.swe_project_backend.repository.PromoCodeRepository;
import com.movieapp.swe_project_backend.repository.UserInfoRepository;

@Service
public class PromoCodeImp implements PromoCodeService {

    @Autowired
    private PromoCodeRepository promoCodeRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public PromoCode savePromoCode(PromoCode promoCode) {
        PromoCode saved = promoCodeRepository.save(promoCode);

        List<UserInfo> subscribedUsers = userInfoRepository.findByEnrollForPromotions(true);
        for (UserInfo user : subscribedUsers) {
            emailService.sendPromoNotificationEmail(user.getEmail(), saved.getCode(), saved.getDiscount());
        }

        return saved;
    }

    @Override
    public List<PromoCode> getAllPromoCodes() {
        return promoCodeRepository.findAll();
    }

    @Override
    public Optional<PromoCode> getPromoCodeById(int promoID) {
        return promoCodeRepository.findById(promoID);
    }

    @Override
    public Optional<PromoCode> getPromoCodeByCode(String code) {
        return promoCodeRepository.findByCode(code);
    }

    @Override
    public void deletePromoCode(int promoID) {
        promoCodeRepository.deleteById(promoID);
    }
}
