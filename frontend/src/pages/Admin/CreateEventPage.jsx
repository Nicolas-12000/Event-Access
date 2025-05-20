import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../../services/eventService'; // Import the event service

const CreateEventPage = () => {
  // Initialize react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();
  // Hook for programmatic navigation
  const navigate = useNavigate();
  // State to manage loading state during creation
  const [isLoading, setIsLoading] = useState(false);
  // State to handle creation errors
  const [error, setError] = useState(null);
  // State to manage success message
  const [successMessage, setSuccessMessage] = useState(null);

  // Function to handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true); // Start loading
    setError(null); // Clear previous errors
    setSuccessMessage(null); // Clear previous success message

    try {
      // Call the createEvent function from eventService
      // TODO: Implement createEvent in eventService.js to make an API call
      // Assumption: createEvent takes event data and returns a success indicator or the created event object
      const newEvent = await createEvent(data);

      // Assumption: The creation was successful if newEvent is returned or a success status is indicated
      if (newEvent) {
        setSuccessMessage('Event created successfully!');
        // TODO: Optionally, redirect to the event list or details page after a short delay
        // navigate('/admin/events'); // Example redirection
      } else {
        setError('Failed to create event.');
      }
    } catch (err) {
      console.error('Error creating event:', err);
      setError("Error creating event.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // TODO: Add better styling and form layout

  return (
    <div>
      <h2>Create New Event</h2>
      {/* Form for creating a new event */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Event Name:</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Event name is required' })}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            {...register('date', { required: 'Date is required' })}
          />
          {errors.date && <p style={{ color: 'red' }}>{errors.date.message}</p>}
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            {...register('location', { required: 'Location is required' })}
          />
          {errors.location && <p style={{ color: 'red' }}>{errors.location.message}</p>}
        </div>
        <div>
          <label htmlFor="sessions">Number of Sessions:</label>
          <input
            type="number"
            id="sessions"
            {...register('sessions', { required: 'Number of sessions is required', min: 1 })}
          />
          {errors.sessions && <p style={{ color: 'red' }}>{errors.sessions.message}</p>}
        </div>
        {/* TODO: Add other relevant event fields */}

        {/* Submit button */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Event'}
        </button>
      </form>

      {/* Display messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default CreateEventPage;
