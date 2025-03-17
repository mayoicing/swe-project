package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
}
