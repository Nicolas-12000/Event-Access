import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, updateEvent } from '../../services/eventService'; // Import event service functions

const EditEventPage = () => {
  // Get the eventId from the URL parameters
  const { eventId } = useParams();
  // Initialize react-hook-form
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  // Hook for programmatic navigation
  const navigate = useNavigate();
  // State to manage loading state for fetching event details
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  // State to manage loading state for updating the event
  const [isUpdating, setIsUpdating] = useState(false);
  // State to handle errors
  const [error, setError] = useState(null);
  // State to manage success message
  const [successMessage, setSuccessMessage] = useState(null);

  // Effect to fetch existing event details when eventId changes
  useEffect(() => {
    const fetchEventDetails = async () => {
      setIsLoadingDetails(true); // Start loading details
      setError(null); // Clear previous errors
      try {
        // Call the getEventById function to fetch the event to be edited
        // TODO: Ensure getEventById is implemented in eventService.js
        const eventData = await getEventById(eventId);
        // Populate the form with the fetched data
        reset(eventData); // Use react-hook-form's reset to populate the form
      } catch (err) {
        console.error('Error fetching event details for editing:', err);
        setError("Error fetching event details for editing.");
      } finally {
        setIsLoadingDetails(false); // Stop loading details
      }
    };

    if (eventId) {
      fetchEventDetails(); // Fetch details if eventId is available
    }
  }, [eventId, reset]); // Effect depends on eventId and reset from react-hook-form

  // Function to handle form submission (updating the event)
  const onSubmit = async (data) => {
    setIsUpdating(true); // Start updating loading
    setError(null); // Clear previous errors
    setSuccessMessage(null); // Clear previous success message

    try {
      // Call the updateEvent function from eventService
      // TODO: Implement updateEvent in eventService.js to make an API call
      // Assumption: updateEvent takes eventId and the updated event data
      const updatedEvent = await updateEvent(eventId, data);

      // Assumption: The update was successful if updatedEvent is returned or a success status is indicated
      if (updatedEvent) {
        setSuccessMessage('Event updated successfully!');
        // TODO: Optionally, redirect to the event details page or list page after a short delay
        // navigate(`/events/${eventId}`); // Example redirection to details page
      } else {
        setError('Failed to update event.');
      }
    } catch (err) {
      console.error('Error updating event:', err);
      setError("Error updating event.");
    } finally {
      setIsUpdating(false); // Stop updating loading
    }
  };

  // Render loading, error, or the edit form
  if (isLoadingDetails) {
    return <div>Loading event details for editing...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // TODO: Add better styling and form layout

  return (
    <div>
      <h2>Edit Event</h2>
      {/* Form for editing the event */}
      {/* handleSubmit will trigger onSubmit function on valid form submission */}
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
        <button type="submit" disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update Event'}
        </button>
      </form>

      {/* Display messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default EditEventPage;
