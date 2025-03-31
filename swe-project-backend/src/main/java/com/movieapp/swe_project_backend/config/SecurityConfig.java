
package com.movieapp.swe_project_backend.config;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.movieapp.swe_project_backend.service.JwtService;
import com.movieapp.swe_project_backend.service.UserInfoService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  
    private final JwtAuthenticationFilter jwtAuthFilter; // Inject JWT filter
    private final JwtService jwtService; // Inject JwtService (this should be used in the filter)
    private final UserInfoService userInfoService; // Inject UserInfoService

     // Constructor injection to avoid circular dependency
    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter, JwtService jwtService, UserInfoService userInfoService) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.jwtService = jwtService;
        this.userInfoService = userInfoService;
    }

    // Security filter chain using Lambda DSL
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))  // Apply CORS config
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(
                    "/movieinfo/**",
                    "/userinfo/register",
                    "/userinfo/forgot-password",
                    "/userinfo/reset-password",
                    "/userinfo/getAll",
                    "/userinfo/get/**",
                    "/userinfo/getByEmail",
                    "/userinfo/type/**",
                    "/userinfo/login",
                    "/userinfo/adminlogin",
                    "/paymentcard/**",
                    "/billingaddress/**",
                    "/castandcrew/**",
                    "/billingaddress/update/**",
                    "/billingaddress/update-or-create",
                    "/paymentcard/update",
                    "/paymentcard/add",
                    "/usertype/**",
                    "/promocode/**",
                    "/movieshow/**",
                    "/movieDetails/**",
                    "/auditorium/**",
                    "/booking/**",
                    "/ticket/**",
                    "/ticketType/**",
                    "/seat/**",
                    "/castandcrew/**"
                ).permitAll()
                .anyRequest().authenticated() // Any other requests require authentication
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // No sessions
            .addFilterBefore(jwtAuthFilter(), UsernamePasswordAuthenticationFilter.class); // JWT filter

            /*
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
            */

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
        
     // ✅ JWT Authentication Filter
    @Bean
    public JwtAuthenticationFilter jwtAuthFilter() {
        return new JwtAuthenticationFilter(jwtService, userInfoService);
    }
    
     // BCryptPasswordEncoder for password encoding
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }
}
