import API from "./api";

export const generateEventReport = async (eventId) => {
  const response = await API.get(`/reports/event/${eventId}`, {
    responseType: 'blob', 
  });
  return response.data;
};