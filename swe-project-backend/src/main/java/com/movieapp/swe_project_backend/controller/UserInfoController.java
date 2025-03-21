package com.movieapp.swe_project_backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

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

    // ✅ Fetch users by user_typeid (GET request)
    @GetMapping("/type/{userTypeId}")
    public List<UserInfo> getUsersByUserType(@PathVariable int userTypeId) {
        return userInfoService.getUsersByUserType(userTypeId);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody UserInfo userInfo) {
        System.out.println("Received User Info: " + userInfo); // Log the received data
    
        // check if email already exists
        Optional<UserInfo> existingUser = userInfoService.getUserByEmail(userInfo.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", "Email already in use!"));
        }
        
        // encrypt password before saving
        userInfo.setPassword(new BCryptPasswordEncoder().encode(userInfo.getPassword()));

        // Set default values before saving
        userInfo.setStatus(UserInfo.Status.Active); // Enum type

        // Save user info
        try {
            UserInfo savedUser = userInfoService.saveUserInfo(userInfo);

            // Prepare response with userID and message
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully!");
            response.put("userID", savedUser.getUserID());  // Add userID to the response

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Error saving user information!"));
        }
    }

    // ✅ DELETE USER FUNCTION
    @DeleteMapping("/delete/{userID}")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable int userID) {
        Optional<UserInfo> user = userInfoService.getUserById(userID);
        
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found!"));
        }

        try {
            userInfoService.deleteUser(userID);
            return ResponseEntity.ok(Map.of("message", "User deleted successfully!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Error deleting user!"));
        }
    }
}
