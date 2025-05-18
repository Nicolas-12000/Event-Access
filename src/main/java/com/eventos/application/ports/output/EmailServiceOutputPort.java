package com.eventos.application.ports.output;

public interface EmailServiceOutputPort {
    void sendEmailWithAttachment(String to, String subject, String body, byte[] attachmentPath);
    void sendEmailwithQRImage(String to, String subject, String body, byte[] qrCodeImage);
}
