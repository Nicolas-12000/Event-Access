import axios from "axios";

// Configuración base de Axios para el backend
const API = axios.create({
  baseURL: "http://localhost:8082/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token JWT en cada petición si existe
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores globalmente
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirigir a login si hay error de autenticación
      window.location.href = '/login';
    }
    // Puedes manejar otros errores globales aquí
    return Promise.reject(error);
  }
);

// Métodos para consumir el backend

// Obtener todos los eventos
export const getEvents = () => API.get("/events");

// Obtener un evento por ID
export const getEventById = (id) => API.get(`/events/${id}`);

// Crear un nuevo evento
export const createEvent = (eventData) => API.post("/events", eventData);

// Actualizar un evento existente
export const updateEvent = (id, eventData) => API.put(`/events/${id}`, eventData);

// Eliminar un evento
export const deleteEvent = (id) => API.delete(`/events/${id}`);

// Estudiantes
export const getStudents = () => API.get("/students");
export const getStudentById = (id) => API.get(`/students/${id}`);
export const createStudent = (studentData) => API.post("/students", studentData);
export const updateStudent = (id, studentData) => API.put(`/students/${id}`, studentData);
export const deleteStudent = (id) => API.delete(`/students/${id}`);

// QR Codes
export const getQRCodes = () => API.get("/qrcodes");
export const getQRCodeById = (id) => API.get(`/qrcodes/${id}`);
export const createQRCode = (qrCodeData) => API.post("/qrcodes", qrCodeData);
export const deleteQRCode = (id) => API.delete(`/qrcodes/${id}`);

// Asistencias
export const getAttendances = () => API.get("/attendances");
export const getAttendanceById = (id) => API.get(`/attendances/${id}`);
export const createAttendance = (attendanceData) => API.post("/attendances", attendanceData);
export const deleteAttendance = (id) => API.delete(`/attendances/${id}`);


export default API;