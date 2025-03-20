package com.movieapp.swe_project_backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movieapp.swe_project_backend.model.UserType;
import com.movieapp.swe_project_backend.service.UserTypeService;

@RestController
@RequestMapping("/usertype")
public class UserTypeController {

    @Autowired
    private UserTypeService userTypeService;

    // ✅ Add User Type
    @PostMapping("/add")
    public ResponseEntity<UserType> addUserType(@RequestBody UserType userType) {
        return ResponseEntity.ok(userTypeService.saveUserType(userType));
    }

    // ✅ Get All User Types
    @GetMapping("/getAll")
    public ResponseEntity<List<UserType>> getAllUserTypes() {
        return ResponseEntity.ok(userTypeService.getAllUserTypes());
    }

    // ✅ Get User Type by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<Optional<UserType>> getUserTypeById(@PathVariable int id) {
        return ResponseEntity.ok(userTypeService.getUserTypeById(id));
    }

    // ✅ Delete User Type
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUserType(@PathVariable int id) {
        userTypeService.deleteUserType(id);
        return ResponseEntity.ok("User Type deleted successfully!");
    }
}
