import api from './axiosInstance';

export const emailService = {
  sendQRCodeEmails: async (eventId, sessionNumber, identityDocument = []) => {
    const response = await api.post('/emails/send-qr', {
      eventId,
      sessionNumber,
      identityDocument
    });
    return response.data;
  }
};