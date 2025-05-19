package com.eventos.infrastructure.services;

import com.eventos.application.ports.output.EmailServiceOutputPort;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailServiceOutputPort {

    private final JavaMailSender mailSender;

    @Override
    public void sendEmailWithAttachment(String to, String subject, String body, byte[] attachment) {
        sendEmail(to, subject, body, attachment, "attachment.pdf");
    }

    @Override
    public void sendEmailWithQRImage(String to, String subject, String body, byte[] qrCodeImage) {
        sendEmail(to, subject, body, qrCodeImage, "qr_asistencia.png");
    }

    private void sendEmail(String to, String subject, String body, byte[] attachment, String filename) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true);
            
            if (attachment != null && attachment.length > 0) {
                helper.addAttachment(filename, new ByteArrayResource(attachment));
            }
            
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Error enviando email a: " + to, e);
        }
    }
}