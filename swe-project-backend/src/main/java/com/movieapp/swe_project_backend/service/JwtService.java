package com.movieapp.swe_project_backend.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;
 
import org.springframework.stereotype.Service;

import com.movieapp.swe_project_backend.model.UserInfo;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
    private final SecretKey SECRET_KEY = Keys.hmacShaKeyFor("gV4zBkc4fd2N3a3yH7XsDw==".getBytes());

    public String generateToken(UserInfo user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", user.getEmail());
        claims.put("userID", user.getUserID());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 1-day expiry
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

public boolean validateToken(String token) {
    try {
        Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
        return true;
    } catch (Exception e) {
        return false;
    }
}

public String extractEmail(String token) {
    return extractClaims(token).getSubject();
}

public int extractUserID(String token) {
    return (int) extractClaims(token).get("userID");
}

private Claims extractClaims(String token) {
    return Jwts.parserBuilder()
            .setSigningKey(SECRET_KEY)
            .build()
            .parseClaimsJws(token)
            .getBody();
    }
}
