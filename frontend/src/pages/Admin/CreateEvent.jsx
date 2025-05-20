// frontend/src/pages/Admin/CreateEvent.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { createEvent } from '../../services/eventService';

const CreateEvent = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await createEvent(data);
      alert('Evento creado exitosamente!');
      reset(); // Reset the form after successful submission
      // Optionally, redirect to the events list page
      // navigate('/events');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creando evento: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Evento</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Nombre del evento:</label>
          <input id="name" {...register('name', { required: true })} />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea id="description" {...register('description')}></textarea>
        </div>
        <div>
          <label htmlFor="date">Fecha:</label>
          <input id="date" type="date" {...register('date', { required: true })} />
        </div>
        <div>
          <label htmlFor="location">Lugar:</label>
          <input id="location" {...register('location', { required: true })} />
        </div>
        <div>
          <label htmlFor="totalSessions">Número total de sesiones:</label>
          <input id="totalSessions" type="number" {...register('totalSessions', { required: true, valueAsNumber: true })} />
        </div>
        <button type="submit">Crear Evento</button>
      </form>
    </div>
  );
};

export default CreateEvent;