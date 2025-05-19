package com.eventos.application.ports.output;
public interface EmailServiceOutputPort {
    void sendEmailWithAttachment(String to, String subject, String body, byte[] attachmentPath);
    void sendEmailWithQRImage(String to, String subject, String body, byte[] qrCodeImage);
}
