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

    public void sendResetCodeEmail(String toEmail, String resetCode) {
        String subject = "🔒 Password Reset Code";
        String body = "Hello,\n\n"
            + "You requested a password reset. Please use the following code to reset your password:\n\n"
            + resetCode + "\n\n"
            + "This code will expire in 15 minutes.\n\n"
            + "To reset your password, go to:\n"
            + "http://localhost:3000/changePassword\n\n"
            + "If you did not request this, you can ignore this email.\n\n"
            + "Best regards,\nThe MovieApp Team";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
}
}