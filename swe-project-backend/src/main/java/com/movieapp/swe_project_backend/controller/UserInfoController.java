package com.movieapp.swe_project_backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.movieapp.swe_project_backend.model.UserInfo;
import com.movieapp.swe_project_backend.service.UserInfoService;

@RestController
@RequestMapping("/userinfo")
public class UserInfoController {

    @Autowired
    private UserInfoService userInfoService;

    @GetMapping("/getAll")
    public List<UserInfo> getAllUsers() {
        return userInfoService.getAllUsers();
    }

    @GetMapping("/get/{userID}")
    public Optional<UserInfo> getUserById(@PathVariable int userID) {
        return userInfoService.getUserById(userID);
    }

    @GetMapping("/getByEmail")
    public Optional<UserInfo> getUserByEmail(@RequestParam String email) {
        return userInfoService.getUserByEmail(email);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserInfo userInfo) {
        System.out.println("Received User Info: " + userInfo); // Log the received data
        // Validate incoming user info
       /*
        if (userInfo.getFirstName() == null || userInfo.getLastName() == null || userInfo.getEmail() == null || userInfo.getPassword() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("All fields are required!");
        }
        */
        // check if email already exists
        Optional<UserInfo> existingUser = userInfoService.getUserByEmail(userInfo.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already in use!");
        }
        
        // encrypt password before saving
        userInfo.setPassword(new BCryptPasswordEncoder().encode(userInfo.getPassword()));

        // Set default values before saving
        userInfo.setStatus(UserInfo.Status.Active); // Enum type
        userInfo.setUserType(2); // user type 2 is customer

        // Save user info
        try {
            userInfoService.saveUserInfo(userInfo);
            return ResponseEntity.ok("User registered successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving user information!");
        }
    }
}
