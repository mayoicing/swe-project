package com.movieapp.swe_project_backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.movieapp.swe_project_backend.model.UserInfo;
import com.movieapp.swe_project_backend.repository.UserInfoRepository;

@Service
public class UserInfoImp implements UserInfoService {

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public UserInfo saveUserInfo(UserInfo userInfo) {  
        return userInfoRepository.save(userInfo);
    }

    @Override
    public List<UserInfo> getAllUsers() {
        return userInfoRepository.findAll();
    }

    @Override
    public Optional<UserInfo> getUserById(int userId) {
        return userInfoRepository.findById(userId);
    }

    @Override
    public Optional<String> getUserEmailById(int userId) {
        return userInfoRepository.findById(userId).map(UserInfo::getEmail);
    }

    @Override
    public Optional<UserInfo> getUserByEmail(String email) {
        return userInfoRepository.findByEmail(email);
    }

    @Override
    public List<UserInfo> getUsersByUserType(UserInfo.UserType userType) {
        return userInfoRepository.findByUserType(userType);
    }

    @Override
    public void deleteUser(int userID) {
        userInfoRepository.deleteById(userID);
    }

    @Override
    public Integer getUserIdFromSession() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication instanceof UsernamePasswordAuthenticationToken) {
            Object userId = authentication.getDetails();
            if (userId instanceof Integer) {
                return (Integer) userId;
            }
        }
        return null;
    }

    @Override
    public void generateResetCodeForUser(String email) {
        Optional<UserInfo> userOpt = userInfoRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            UserInfo user = userOpt.get();
            String code = String.format("%06d", new Random().nextInt(999999)); // 6-digit code
            user.setResetCode(code);
            user.setResetCodeExpiry(LocalDateTime.now().plusMinutes(15));
            userInfoRepository.save(user);

            // Send the reset code via email
            emailService.sendResetCodeEmail(user.getEmail(), code);
        } else {
            throw new RuntimeException("User not found with that email.");
        }
    }
}
