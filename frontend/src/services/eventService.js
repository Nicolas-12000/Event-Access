// This file contains functions for event-related API calls.

// TODO: Implement the actual API calls using fetch or axios.
// Ensure you handle success and error responses appropriately.

// Placeholder for the backend API base URL
const API_BASE_URL = 'http://localhost:8082/api'; // Adjust if your backend is on a different port/URL

// Helper function to get the authentication token (assuming authService is implemented)
import { getAuthToken } from './authService';

/**
 * Fetches all events from the backend.
 * @returns {Promise<Array<object>>} A promise that resolves with an array of event objects on success, or rejects with an error.
 */
export const getAllEvents = async () => {
  try {
    // TODO: Make a GET request to your backend endpoint for listing all events.
    // As per README [2], the endpoint is GET /api/events
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // TODO: Include authentication token if this endpoint is protected
        // 'Authorization': `Bearer ${getAuthToken()}`, // Example
      },
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch events');
    }

    // Parse the JSON response
    const data = await response.json();

    // TODO: Return the array of event objects.
    // Assumption: The backend returns an array of event objects.
    return data; // Adjust based on your backend response structure

  } catch (error) {
    console.error('Get all events service error:', error);
    throw error; // Re-throw the error
  }
};

/**
 * Fetches a single event by its ID from the backend.
 * @param {string} eventId The ID of the event to fetch.
 * @returns {Promise<object>} A promise that resolves with the event object on success, or rejects with an error.
 */
export const getEventById = async (eventId) => {
  try {
    // TODO: Make a GET request to your backend endpoint for fetching a single event.
    // As per README [2], the endpoint is GET /api/events/{eventId}
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // TODO: Include authentication token if this endpoint is protected
        // 'Authorization': `Bearer ${getAuthToken()}`, // Example
      },
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch event details');
    }

    // Parse the JSON response
    const data = await response.json();

    // TODO: Return the event object.
    // Assumption: The backend returns a single event object.
    return data; // Adjust based on your backend response structure

  } catch (error) {
    console.error('Get event by ID service error:', error);
    throw error; // Re-throw the error
  }
};

/**
 * Creates a new event by sending data to the backend.
 * @param {object} eventData The data for the new event.
 * @returns {Promise<object>} A promise that resolves with the created event object or success indicator on success, or rejects with an error.
 */
export const createEvent = async (eventData) => {
  try {
    // TODO: Make a POST request to your backend endpoint for creating events.
    // As per README [2], the endpoint is POST /api/events
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // TODO: Include authentication token as this endpoint will likely be protected
        // 'Authorization': `Bearer ${getAuthToken()}`, // Example
      },
      body: JSON.stringify(eventData), // Send event data in the request body
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create event');
    }

    // Parse the JSON response
    const data = await response.json();

    // TODO: Return the created event object or a success indicator.
    // Assumption: The backend returns the newly created event object.
    return data; // Adjust based on your backend response structure

  } catch (error) {
    console.error('Create event service error:', error);
    throw error; // Re-throw the error
  }
};

/**
 * Updates an existing event by sending data to the backend.
 * @param {string} eventId The ID of the event to update.
 * @param {object} eventData The updated data for the event.
 * @returns {Promise<object>} A promise that resolves with the updated event object or success indicator on success, or rejects with an error.
 */
export const updateEvent = async (eventId, eventData) => {
  try {
    // TODO: Make a PUT request to your backend endpoint for updating events.
    // As per README [2], the endpoint is PUT /api/events/{eventId}
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // TODO: Include authentication token as this endpoint will likely be protected
        // 'Authorization': `Bearer ${getAuthToken()}`, // Example
      },
      body: JSON.stringify(eventData), // Send updated event data in the request body
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update event');
    }

    // Parse the JSON response
    const data = await response.json();

    // TODO: Return the updated event object or a success indicator.
    // Assumption: The backend returns the updated event object.
    return data; // Adjust based on your backend response structure

  } catch (error) {
    console.error('Update event service error:', error);
    throw error; // Re-throw the error
  }
};

/**
 * Deletes an event by sending a request to the backend.
 * TODO: Implement this function if you need delete functionality.
 * As per README [2], the endpoint is DELETE /api/events/{eventId}
 * @param {string} eventId The ID of the event to delete.
 * @returns {Promise<void>} A promise that resolves on successful deletion, or rejects with an error.
 */
export const deleteEvent = async (eventId) => {
   try {
    // TODO: Make a DELETE request to your backend endpoint for deleting events.
    // As per README [2], the endpoint is DELETE /api/events/{eventId}
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // TODO: Include authentication token as this endpoint will likely be protected
        // 'Authorization': `Bearer ${getAuthToken()}`, // Example
      },
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete event');
    }

    // No need to parse JSON for a typical DELETE success, but you might check response.status
    // For example, check for response.status === 204 (No Content) or 200 (OK)

   } catch (error) {
    console.error('Delete event service error:', error);
    throw error; // Re-throw the error
  }
};
