import API from "./api";

export const getAllStudents = async () => {
  const response = await API.get("/students");
  return response.data;
};

export const getStudentById = async (studentIdentifier) => {
  const response = await API.get(`/students/${studentIdentifier}`);
  return response.data;
};

export const createStudent = async (studentData) => {
  const response = await API.post("/students", studentData);
  return response.data;
};

export const updateStudent = async (studentIdentifier, studentData) => {
  const response = await API.put(`/students/${studentIdentifier}`, studentData);
  return response.data;
};

export const deleteStudent = async (studentIdentifier) => {
  const response = await API.delete(`/students/${studentIdentifier}`);
  return response.data;
};

export const uploadStudents = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await API.post("/students/upload", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};
