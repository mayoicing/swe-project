package com.movieapp.swe_project_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendConfirmationEmail(String toEmail, String userName) {
        String subject = "🎉 Welcome to MovieApp, " + userName + "!";
        String body = "Hi " + userName + ",\n\n"
                + "Thank you for signing up for our movie app! We're excited to have you onboard.\n"
                + "Enjoy exploring our platform and watching your favorite movies!\n\n"
                + "Best,\nMovieApp Team";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
        System.out.println("📩 Confirmation email sent to: " + toEmail);
    }
}