import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../../services/eventService';

const CreateEventPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const newEvent = await createEvent(data);
      if (newEvent) {
        setSuccessMessage('Event created successfully!');
        reset();
        setTimeout(() => navigate('/admin/events'), 1200);
      } else {
        setError('Failed to create event.');
      }
    } catch (err) {
      console.error('Error creating event:', err);
      setError("Error creating event.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Create New Event</h2>
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
          <label htmlFor="numberOfSessions">Number of Sessions:</label>
          <input
            type="number"
            id="numberOfSessions"
            {...register('numberOfSessions', { required: 'Number of sessions is required', min: 1 })}
          />
          {errors.numberOfSessions && <p style={{ color: 'red' }}>{errors.numberOfSessions.message}</p>}
        </div>
        <div>
          <label htmlFor="place">Place:</label>
          <input
            type="text"
            id="place"
            {...register('place', { required: 'Place is required' })}
          />
          {errors.place && <p style={{ color: 'red' }}>{errors.place.message}</p>}
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            {...register('description')}
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            {...register('startDate', { required: 'Start date is required' })}
          />
          {errors.startDate && <p style={{ color: 'red' }}>{errors.startDate.message}</p>}
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            {...register('endDate', { required: 'End date is required' })}
          />
          {errors.endDate && <p style={{ color: 'red' }}>{errors.endDate.message}</p>}
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default CreateEventPage;
