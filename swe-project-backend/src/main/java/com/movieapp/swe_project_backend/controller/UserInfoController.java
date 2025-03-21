package com.movieapp.swe_project_backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.movieapp.swe_project_backend.model.UserInfo;
import com.movieapp.swe_project_backend.service.EmailService;
import com.movieapp.swe_project_backend.service.JwtService;
import com.movieapp.swe_project_backend.service.UserInfoService;

@RestController
@RequestMapping("/userinfo")
public class UserInfoController {

    @Autowired
    private UserInfoService userInfoService;

    @Autowired
    private EmailService emailService; // ✅ Inject EmailService

    @Autowired
    private JwtService jwtService; // ✅ Inject JwtService

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

    @GetMapping("/type/{userTypeId}")
    public List<UserInfo> getUsersByUserType(@PathVariable int userTypeId) {
        return userInfoService.getUsersByUserType(userTypeId);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody UserInfo userInfo) {
        System.out.println("Received User Info: " + userInfo);

        // Check if email already exists
        Optional<UserInfo> existingUser = userInfoService.getUserByEmail(userInfo.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Email already in use!"));
        }

        // Encrypt password before saving
        userInfo.setPassword(new BCryptPasswordEncoder().encode(userInfo.getPassword()));
        userInfo.setStatus(UserInfo.Status.Active); // Default Status

        try {
            // Save User
            UserInfo savedUser = userInfoService.saveUserInfo(userInfo);

            // ✅ Send Confirmation Email
            emailService.sendConfirmationEmail(savedUser.getEmail(), savedUser.getFirstName());

            System.out.println("📩 Confirmation email sent to: " + savedUser.getEmail());

            // Prepare response
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully!");
            response.put("userID", savedUser.getUserID());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error saving user information!"));
        }
    }

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
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Optional<UserInfo> userOptional = userInfoService.getUserByEmail(email);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Email not found"));
        }

        UserInfo user = userOptional.get();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if (!encoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Incorrect password"));
        }

        // ✅ Generate JWT Token
        String token = jwtService.generateToken(user);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful!");
        response.put("userID", user.getUserID());
        response.put("token", token); // Send the token to the frontend

        return ResponseEntity.ok(response);
    }
}