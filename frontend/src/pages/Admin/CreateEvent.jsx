// frontend/src/pages/Admin/CreateEvent.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../../services/eventService';

const CreateEvent = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
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
        setSuccessMessage('Evento creado exitosamente!');
        reset();
        setTimeout(() => navigate('/admin/events'), 1200);
      } else {
        setError('No se pudo crear el evento.');
      }
    } catch (err) {
      console.error('Error creando evento:', err);
      setError("Error creando evento.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Evento</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Nombre del evento:</label>
          <input id="name" {...register('name', { required: 'El nombre es obligatorio' })} />
          {errors.name && <span style={{ color: 'red' }}>{errors.name.message}</span>}
        </div>
        <div>
          <label htmlFor="numberOfSessions">Número de sesiones:</label>
          <input
            id="numberOfSessions"
            type="number"
            min={1}
            {...register('numberOfSessions', {
              required: 'El número de sesiones es obligatorio',
              valueAsNumber: true,
              min: { value: 1, message: 'Debe ser al menos 1' }
            })}
          />
          {errors.numberOfSessions && <span style={{ color: 'red' }}>{errors.numberOfSessions.message}</span>}
        </div>
        <div>
          <label htmlFor="place">Lugar:</label>
          <input id="place" {...register('place', { required: 'El lugar es obligatorio' })} />
          {errors.place && <span style={{ color: 'red' }}>{errors.place.message}</span>}
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea id="description" {...register('description')} />
        </div>
        <div>
          <label htmlFor="startDate">Fecha de inicio:</label>
          <input
            id="startDate"
            type="date"
            {...register('startDate', { required: 'La fecha de inicio es obligatoria' })}
          />
          {errors.startDate && <span style={{ color: 'red' }}>{errors.startDate.message}</span>}
        </div>
        <div>
          <label htmlFor="endDate">Fecha de fin:</label>
          <input
            id="endDate"
            type="date"
            {...register('endDate', { required: 'La fecha de fin es obligatoria' })}
          />
          {errors.endDate && <span style={{ color: 'red' }}>{errors.endDate.message}</span>}
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creando...' : 'Crear Evento'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default CreateEvent;