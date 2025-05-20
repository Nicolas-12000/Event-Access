import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, updateEvent } from '../../services/eventService';

const EditEventPage = () => {
  const { eventId } = useParams();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setIsLoadingDetails(true);
      setError(null);
      try {
        const eventData = await getEventById(eventId);
        reset(eventData);
      } catch (err) {
        console.error('Error fetching event details for editing:', err);
        setError("Error fetching event details for editing.");
      } finally {
        setIsLoadingDetails(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId, reset]);

  const onSubmit = async (data) => {
    setIsUpdating(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const updatedEvent = await updateEvent(eventId, data);
      if (updatedEvent) {
        setSuccessMessage('Event updated successfully!');
        setTimeout(() => navigate('/admin/events'), 1200);
      } else {
        setError('Failed to update event.');
      }
    } catch (err) {
      console.error('Error updating event:', err);
      setError("Error updating event.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoadingDetails) {
    return <div>Loading event details for editing...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Edit Event</h2>
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
        <button type="submit" disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update Event'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default EditEventPage;
