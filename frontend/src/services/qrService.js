// services/qrService.js
import API from "./api";

export const generateQR = async (identityDocument, eventId) => {
  const response = await API.post("/qr_codes/generate", null, {
    params: {
      identityDocument,
      eventId,
    },
  });
  return response.data;
};

export const validateQR = async (qrId) => {
  const response = await API.post(`/qr_codes/validate/${qrId}`);
  return response.data; // Or handle based on the backend's response body for validation
};

export const deleteQR = async (qrId) => {
  const response = await API.delete(`/qr_codes/${qrId}`);
  return response.data; // Or handle based on the backend's response body for deletion
};

export const getQrDetailsById = async (qrId) => {
  const response = await API.get(`/qr_codes/${qrId}/details`);
  return response.data;
};