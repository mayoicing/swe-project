package com.movieapp.swe_project_backend.config;

import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;

import com.movieapp.swe_project_backend.service.JwtService;
import com.movieapp.swe_project_backend.model.UserInfo;
import com.movieapp.swe_project_backend.service.UserInfoService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserInfoService userInfoService; // To retrieve user info from the database
    private static final Logger jwtLogger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    public JwtAuthenticationFilter(JwtService jwtService, UserInfoService userInfoService) {
        this.jwtService = jwtService;
        this.userInfoService = userInfoService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            chain.doFilter(request, response); // If no token is present, continue the filter chain
            return;
        }

        String token = authHeader.substring(7); // Extract the token from the "Bearer " prefix
        
       try {
            String email = jwtService.extractEmail(token); // Extract email from the token

            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserInfo user = userInfoService.getUserByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

                // Create the authentication object without authorities
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        user, null, null // No authorities for now
                );

                // Set the authentication context for the current request
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            // Log the exception
            jwtLogger.error("JWT Token validation failed: {}", e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);  // 401 Unauthorized
            response.getWriter().write("Invalid token or user not found");
        }

        chain.doFilter(request, response); // Continue the filter chain
    }
}
