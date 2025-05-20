import API from "./api";

export const registerAttendance = async (attendanceData) => {
  const response = await API.post("/attendances", attendanceData);
  return response.data;
};

export const getAttendanceByEventId = async (eventId) => {
  const response = await API.get(`/attendances/event/${eventId}`);
  return response.data;
};

export const getAttendanceByStudentId = async (identityDocument) => {
  const response = await API.get(`/attendances/student/${identityDocument}`);
  return response.data;
};