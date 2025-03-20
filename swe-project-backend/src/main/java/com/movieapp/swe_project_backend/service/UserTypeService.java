package com.movieapp.swe_project_backend.service;

import java.util.List;
import java.util.Optional;

import com.movieapp.swe_project_backend.model.UserType;

public interface UserTypeService {
    UserType saveUserType(UserType userType);
    List<UserType> getAllUserTypes();
    Optional<UserType> getUserTypeById(int userTypeId);
    void deleteUserType(int userTypeId);
}
