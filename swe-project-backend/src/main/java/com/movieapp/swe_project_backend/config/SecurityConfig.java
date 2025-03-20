
package com.movieapp.swe_project_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Security filter chain using Lambda DSL
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/movieinfo/**", "/userinfo/**","/paymentcard/**","/billingaddress/**","/castandcrew/**").permitAll() // Allow these endpoints without authentication
                .anyRequest().authenticated() // Any other requests require authentication
            )
            .formLogin(formLogin -> formLogin
                .loginPage("/login") // Customize login page URL if needed
                .permitAll() // Allow access to login page without authentication
            )
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Apply CORS configuration
            .exceptionHandling(exceptionHandling -> exceptionHandling
                .authenticationEntryPoint(new Http403ForbiddenEntryPoint()) // Customize error handling
            )
            .rememberMe(rememberMe -> rememberMe
                .key("uniqueAndSecretKey") // Set a unique key for token generation
                .tokenValiditySeconds(86400) // Set token validity (e.g., 1 day)
            );

        return http.build();
    }

    // CORS Configuration
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.addAllowedOrigin("http://localhost:3000"); // Allow requests from your frontend (adjust if needed)
        corsConfig.addAllowedMethod("GET");
        corsConfig.addAllowedMethod("POST");
        corsConfig.addAllowedMethod("PUT");
        corsConfig.addAllowedMethod("DELETE");
        corsConfig.addAllowedHeader("*"); // Allow all headers
        corsConfig.setAllowCredentials(true); // Allow sending cookies

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig); // Apply the CORS configuration to all paths

        return source;
    }
}
