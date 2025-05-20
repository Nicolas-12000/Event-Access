// services/qrService.js
import API from "./api";

export const generateQR = async (identityDocument, eventId) => {
  const response = await API.post(
    `/qr_codes/generate?identityDocument=${encodeURIComponent(identityDocument)}&eventId=${eventId}`
  );
  return response.data;
};

export const getQRDetails = async (qrId) => {
  const response = await API.get(`/qr_codes/${qrId}/details`);
  return response.data;
};