// This file contains functions for student-related API calls.

// TODO: Implement the actual API calls using fetch or axios.
// Ensure you handle success and error responses appropriately.

// Placeholder for the backend API base URL
const API_BASE_URL = 'http://localhost:8082/api'; // Adjust if your backend is on a different port/URL

// Helper function to get the authentication token (assuming authService is implemented)
import { getAuthToken } from './authService';

/**
 * Fetches all students from the backend.
 * @returns {Promise<Array<object>>} A promise that resolves with an array of student objects on success, or rejects with an error.
 */
export const getAllStudents = async () => {
  try {
    // TODO: Make a GET request to your backend endpoint for listing all students.
    // Based on the README [1] and common API design, an endpoint like GET /api/students is expected.
    const response = await fetch(`${API_BASE_URL}/students`, { // Adjust the endpoint as per your backend
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // TODO: Include authentication token as this endpoint will likely be protected
        'Authorization': `Bearer ${getAuthToken()}`, // Example - assuming student list is protected
      },
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch students');
    }

    // Parse the JSON response
    const data = await response.json();

    // TODO: Return the array of student objects.
    // Assumption: The backend returns an array of student objects.
    return data; // Adjust based on your backend response structure

  } catch (error) {
    console.error('Get all students service error:', error);
    throw error; // Re-throw the error
  }
};

/**
 * Fetches a single student by their identifier (e.g., identity document) from the backend.
 * @param {string} studentIdentifier The identifier of the student to fetch (e.g., identity document).
 * @returns {Promise<object>} A promise that resolves with the student object on success, or rejects with an error.
 */
export const getStudentById = async (studentIdentifier) => {
  try {
    // TODO: Make a GET request to your backend endpoint for fetching a single student.
    // As per README [1], the endpoint is GET /api/students/{identityDocument}
    const response = await fetch(`${API_BASE_URL}/students/${studentIdentifier}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // TODO: Include authentication token as this endpoint will likely be protected
        'Authorization': `Bearer ${getAuthToken()}`, // Example - assuming single student retrieval is protected
      },
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch student details');
    }

    // Parse the JSON response
    const data = await response.json();

    // TODO: Return the student object.
    // Assumption: The backend returns a single student object.
    return data; // Adjust based on your backend response structure

  } catch (error) {
    console.error('Get student by identifier service error:', error);
    throw error; // Re-throw the error
  }
};

/**
 * Creates a new student by sending data to the backend.
 * @param {object} studentData The data for the new student.
 * @returns {Promise<object>} A promise that resolves with the created student object or success indicator on success, or rejects with an error.
 */
export const createStudent = async (studentData) => {
  try {
    // TODO: Make a POST request to your backend endpoint for creating students.
    // As per README [1], the endpoint is POST /api/students
    const response = await fetch(`${API_BASE_URL}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // TODO: Include authentication token as this endpoint will likely be protected
        'Authorization': `Bearer ${getAuthToken()}`, // Example - assuming student creation is protected
      },
      body: JSON.stringify(studentData), // Send student data in the request body
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create student');
    }

    // Parse the JSON response
    const data = await response.json();

    // TODO: Return the created student object or a success indicator.
    // Assumption: The backend returns the newly created student object.
    return data; // Adjust based on your backend response structure

  } catch (error) {
    console.error('Create student service error:', error);
    throw error; // Re-throw the error
  }
};

/**
 * Updates an existing student by sending data to the backend.
 * @param {string} studentIdentifier The identifier of the student to update.
 * @param {object} studentData The updated data for the student.
 * @returns {Promise<object>} A promise that resolves with the updated student object or success indicator on success, or rejects with an error.
 */
export const updateStudent = async (studentIdentifier, studentData) => {
  try {
    // TODO: Make a PUT request to your backend endpoint for updating students.
    // As per README [1], the endpoint is PUT /api/students/{identityDocument}
    const response = await fetch(`${API_BASE_URL}/students/${studentIdentifier}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // TODO: Include authentication token as this endpoint will likely be protected
        'Authorization': `Bearer ${getAuthToken()}`, // Example - assuming student update is protected
      },
      body: JSON.stringify(studentData), // Send updated student data in the request body
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update student');
    }

    // Parse the JSON response
    const data = await response.json();

    // TODO: Return the updated student object or a success indicator.
    // Assumption: The backend returns the updated student object.
    return data; // Adjust based on your backend response structure

  } catch (error) {
    console.error('Update student service error:', error);
    throw error; // Re-throw the error
  }
};

/**
 * Deletes a student by sending a request to the backend.
 * @param {string} studentIdentifier The identifier of the student to delete.
 * @returns {Promise<void>} A promise that resolves on successful deletion, or rejects with an error.
 */
export const deleteStudent = async (studentIdentifier) => {
   try {
    // TODO: Make a DELETE request to your backend endpoint for deleting students.
    // As per README [1], the endpoint is DELETE /api/students/{identityDocument}
    const response = await fetch(`${API_BASE_URL}/students/${studentIdentifier}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // TODO: Include authentication token as this endpoint will likely be protected
        'Authorization': `Bearer ${getAuthToken()}`, // Example - assuming student deletion is protected
      },
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete student');
    }

    // No need to parse JSON for a typical DELETE success, but you might check response.status
    // For example, check for response.status === 204 (No Content) or 200 (OK)

   } catch (error) {
    console.error('Delete student service error:', error);
    throw error; // Re-throw the error
  }
};

/**
 * Uploads students from a file (e.g., Excel) to the backend.
 * @param {File} file The file containing student data.
 * @returns {Promise<object>} A promise that resolves with the upload result on success, or rejects with an error.
 */
export const uploadStudents = async (file) => {
  try {
    // TODO: Make a POST request to your backend endpoint for uploading students from a file.
    // You'll need a backend endpoint that can handle file uploads and process the student data.
    // Let's assume an endpoint like POST /api/students/upload
    const formData = new FormData();
    formData.append('file', file); // Append the file to the FormData

    const response = await fetch(`${API_BASE_URL}/students/upload`, { // Adjust the endpoint as per your backend
      method: 'POST',
      headers: {
        // TODO: Include authentication token as this endpoint will likely be protected
        'Authorization': `Bearer ${getAuthToken()}`, // Example - assuming upload is protected
        // Note: 'Content-Type' is automatically set to 'multipart/form-data' when using FormData
      },
      body: formData, // Send the FormData object as the body
    });

    // Handle HTTP errors
    if (!response.ok) {
       const errorData = await response.json();
       throw new Error(errorData.message || 'Failed to upload students');
    }

    // Parse the JSON response
    const data = await response.json();

    // TODO: Return the upload result.
    // Assumption: The backend returns details about the upload (e.g., number of students created, errors).
    return data; // Adjust based on your backend response structure

  } catch (error) {
    console.error('Upload students service error:', error);
    throw error; // Re-throw the error
  }
};
