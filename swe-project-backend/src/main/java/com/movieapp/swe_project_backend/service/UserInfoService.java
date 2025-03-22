package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import com.movieapp.swe_project_backend.model.UserInfo;

public interface UserInfoService {
    UserInfo saveUserInfo(UserInfo userInfo);
    List<UserInfo> getAllUsers();
    
    Optional<UserInfo> getUserById(int userId);
    Optional<String> getUserEmailById(int userId);
    Optional<UserInfo> getUserByEmail(String email);

    List<UserInfo> getUsersByUserType(UserInfo.UserType userType);
    void deleteUser(int userID);
    Integer getUserIdFromSession();

    // 🔐 New method to generate and set reset code
    void generateResetCodeForUser(String email);
}