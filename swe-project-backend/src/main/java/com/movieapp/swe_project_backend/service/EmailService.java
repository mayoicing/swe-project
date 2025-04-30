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
                + "Best,\nThe SlayTix Team";

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
            + "Best regards,\nThe SlayTix Team";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
}

public void sendPromoNotificationEmail(String toEmail, String promoCode, int discount) {
    String subject = "🔥 New Promo Code Just for You!";
    String body = "Hi there!\n\n"
        + "We're excited to offer you a new promo code: " + promoCode + "\n"
        + "Use it to get " + discount + "% off your next purchase!\n\n"
        + "Hurry — don’t miss out!\n\n"
        + "The SlayTix Team 🎬";

    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(toEmail);
    message.setSubject(subject);
    message.setText(body);

    mailSender.send(message);
    System.out.println("📩 Promo email sent to: " + toEmail);
}

public void sendBookingConfirmationEmail(String toEmail, String userName, String movieTitle, String auditoriumName, int ticketCount, float totalPrice, String promoCode) {
    try {
        String subject = "🎟️ Your Movie Booking is Confirmed!";
        String body = "Hi " + userName + ",\n\n"
                + "Thank you for booking with SlayTix! 🎬\n\n"
                + "🎞️ Movie: " + movieTitle + "\n"
                + "📍 Auditorium: " + auditoriumName + "\n"
                + "🎫 Tickets: " + ticketCount + "\n"
                + "💵 Total Paid: $" + totalPrice + "\n"
                + "🏷️ Promo Code: " + (promoCode != null ? promoCode : "None") + "\n\n"
                + "Enjoy the show!\nThe SlayTix Team";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
        System.out.println("📩 Booking confirmation email sent to: " + toEmail);
    } catch (Exception e) {
        System.err.println("⚠️ Failed to send booking confirmation email: " + e.getMessage());
    }
}

}