import api from './axiosInstance';

export const attendanceService = {
  getAttendancesByEvent: async (eventId) => {
    const response = await api.get(`/attendances/event/${eventId}`);
    return response.data;
  },

  getAttendanceByQR: async (qrId) => {
    const response = await api.get(`/attendances/qr/${qrId}`);
    return response.data;
  },

  confirmAttendance: async (attendanceData) => {
    const response = await api.post('/attendances', attendanceData);
    return response.data;
  },

  generateQRCode: async (eventId, sessionNumber) => {
    const response = await api.post(`/qr-codes/generate/${eventId}/${NumberOfSessions}`);
    return response.data;
  }
};