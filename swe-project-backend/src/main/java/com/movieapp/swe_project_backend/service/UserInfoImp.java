package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

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
        // Get the authentication object from the security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication instanceof UsernamePasswordAuthenticationToken) {
            // Extract the userId from the details stored in the authentication token
            Object userId = authentication.getDetails();

            // Return userId, ensuring it's an Integer
            if (userId instanceof Integer) {
                return (Integer) userId;
            }
        }
        return null; // If no userId is found or no authentication object, return null
    }
}
