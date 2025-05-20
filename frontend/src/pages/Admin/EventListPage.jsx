import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllEvents } from '../../services/eventService';

const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const eventsData = await getAllEvents();
        setEvents(eventsData);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError("Error fetching events.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (isLoading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Event List</h2>
      <Link to="/admin/events/create">Create New Event</Link>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.eventId}>
              <Link to={`/events/${event.eventId}`}>{event.name}</Link>
              {' | '}
              <Link to={`/admin/events/edit/${event.eventId}`}>Edit</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventListPage;
