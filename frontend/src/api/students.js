import api from './axiosInstance';

export const studentService = {
  getStudents: async (page = 0, size = 10) => {
    const response = await api.get(`/students?page=${page}&size=${size}`);
    return response.data;
  },

  getStudentById: async (identityDocument) => {
    const response = await api.get(`/students/${identityDocument}`);
    return response.data;
  },

  createStudent: async (studentData) => {
    const response = await api.post('/students', studentData);
    return response.data;
  },

  updateStudent: async (identityDocument, studentData) => {
    const response = await api.put(`/students/${identityDocument}`, studentData);
    return response.data;
  },

  deleteStudent: async (identityDocument) => {
    const response = await api.delete(`/students/${identityDocument}`);
    return response.data;
  },

  uploadStudentsExcel: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/students/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
};
