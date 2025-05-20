// services/reportService.js
import API from "./api";

export const generateEventReport = async (eventId) => {
  const response = await API.get(`/reports/event/${eventId}`, {
    responseType: 'blob', // Important for handling binary data like Excel files
  });
  return response.data;
};