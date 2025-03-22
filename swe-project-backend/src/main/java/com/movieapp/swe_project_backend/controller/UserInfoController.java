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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.movieapp.swe_project_backend.model.UserInfo;
import com.movieapp.swe_project_backend.service.EmailService;
import com.movieapp.swe_project_backend.service.JwtService;
import com.movieapp.swe_project_backend.service.UserInfoImp;
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

    @Autowired
    private UserInfoImp userInfoImp; // ✅ Inject UserInfoImp

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

    @GetMapping("/type/{userType}")
    public List<UserInfo> getUsersByUserType(@PathVariable UserInfo.UserType userType) {
        return userInfoService.getUsersByUserType(userType);
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
        userInfo.setPassword(new BCryptPasswordEncoder(10).encode(userInfo.getPassword()));
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

    @PostMapping("/update-promotions/{userID}")
    public ResponseEntity<Map<String, Object>> updatePromotions(
            @PathVariable int userID,
            @RequestBody Map<String, Boolean> request) {

        Optional<UserInfo> userOptional = userInfoService.getUserById(userID);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found!"));
        }

        UserInfo user = userOptional.get();
        boolean enrollForPromotions = request.getOrDefault("enroll_for_promotions", false); // Default to 0 if missing

        user.setEnrollForPromotions(enrollForPromotions); // Update field

        try {
            UserInfo updatedUser = userInfoService.saveUserInfo(user); // Save changes to DB

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Promotions preference updated successfully!");
            response.put("user", updatedUser);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error updating promotions preference!"));
        }   
    }

    // Update user information
    @PutMapping("/update/{userID}")
    public ResponseEntity<UserInfo> updateUserInfo(@PathVariable("userID") int userId, @RequestBody UserInfo updatedUserInfo) {
        // Fetch the user from the database by ID
        UserInfo existingUser = userInfoService.getUserById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        // Update the user's details (first name, last name, etc.)
        if (updatedUserInfo.getFirstName() != null) {
            existingUser.setFirstName(updatedUserInfo.getFirstName());
        }
        if (updatedUserInfo.getLastName() != null) {
            existingUser.setLastName(updatedUserInfo.getLastName());
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

        // Check if the password has been changed and encrypt it if so
        if (updatedUserInfo.getPassword() != null && !updatedUserInfo.getPassword().equals(existingUser.getPassword())) {
            String encryptedPassword = passwordEncoder.encode(updatedUserInfo.getPassword());
            existingUser.setPassword(encryptedPassword);
        }

        // Save the updated user back to the database
        userInfoService.saveUserInfo(existingUser);

        return ResponseEntity.ok(existingUser); // Return updated user info
    }

    @PostMapping("/verifyPassword")
    public ResponseEntity<Map<String, Object>> verifyPassword(@RequestBody Map<String, String> request) {
        String enteredPassword = request.get("password");
        Integer userId = userInfoImp.getUserIdFromSession(); // Retrieve user ID from session or context

        if (userId == null) {
            // Handle the case where no user is logged in
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "User not authenticated.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }

        // Fetch the user from the database
        UserInfo user = userInfoService.getUserById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        // Verify the entered password matches the stored password
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        boolean isPasswordMatch = passwordEncoder.matches(enteredPassword, user.getPassword());

        Map<String, Object> response = new HashMap<>();
        response.put("success", isPasswordMatch);

        if (!isPasswordMatch) {
            response.put("message", "Incorrect password.");
        }

        return ResponseEntity.ok(response);
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
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);

        if (!encoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Incorrect password"));
        }

        // Check user type for user login
        if (user.getUserType() == UserInfo.UserType.Admin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "Please use the admin login!"));
        }
           
        // ✅ Generate JWT Token
        String token = jwtService.generateToken(user);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful!");
        response.put("userID", user.getUserID());
        response.put("token", token); // Send the token to the frontend

        return ResponseEntity.ok(response);
    }

    @PostMapping("/adminlogin")
    public ResponseEntity<Map<String, Object>> loginAdmin(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Optional<UserInfo> userOptional = userInfoService.getUserByEmail(email);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Email not found"));
        }

        UserInfo user = userOptional.get();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);

        if (!encoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Incorrect password"));
        }

        // Check that the user is an Admin
        if (user.getUserType() == UserInfo.UserType.Customer) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "Please use the user login!"));
        }

        // ✅ Generate JWT Token
        String token = jwtService.generateToken(user);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful!");
        response.put("userID", user.getUserID());
        response.put("token", token);

        return ResponseEntity.ok(response);
    }
}