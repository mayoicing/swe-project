package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movieapp.swe_project_backend.model.UserType;
import com.movieapp.swe_project_backend.repository.UserTypeRepository;

@Service
public class UserTypeImp implements UserTypeService {

    @Autowired
    private UserTypeRepository userTypeRepository;

    @Override
    public UserType saveUserType(UserType userType) {
        return userTypeRepository.save(userType);
    }

    @Override
    public List<UserType> getAllUserTypes() {
        return userTypeRepository.findAll();
    }

    @Override
    public Optional<UserType> getUserTypeById(int userTypeId) {
        return userTypeRepository.findById(userTypeId);
    }

    @Override
    public void deleteUserType(int userTypeId) {
        userTypeRepository.deleteById(userTypeId);
    }
}
