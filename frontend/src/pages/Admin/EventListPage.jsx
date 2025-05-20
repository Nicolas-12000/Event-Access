import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllEvents } from '../../services/eventService'; // Import the event service

const EventListPage = () => {
  // State to store the list of events
  const [events, setEvents] = useState([]);
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(true);
  // State to handle errors
  const [error, setError] = useState(null);

  // Effect to fetch the list of events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true); // Start loading
      setError(null); // Clear previous errors
      try {
        // Call the getAllEvents function from eventService
        // TODO: Implement getAllEvents in eventService.js to make an API call
        // Assumption: getAllEvents returns an array of event objects
        const eventsData = await getAllEvents();
        setEvents(eventsData);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError("Error fetching events.");
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchEvents(); // Fetch events when the component mounts
  }, []); // Empty dependency array ensures this runs only once on mount

  // TODO: Implement delete functionality for events

  // Render loading, error, or the event list
  if (isLoading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // TODO: Add better styling and presentation of the event list

  return (
    <div>
      <h2>Event List</h2>
      {/* Link to the Create Event page */}
      {/* TODO: Add the Link component here */}
      {/* <Link to="/admin/events/create">Create New Event</Link> */}

      {/* Display the list of events */}
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {/* Map over the events and display them */}
          {events.map(event => (
            <li key={event.id}> {/* Assumption: each event object has an 'id' */}
              {/* Link to the Event Details page */}
              {/* TODO: Add the Link component to view event details */}
              {/* <Link to={`/events/${event.id}`}>{event.name}</Link> */}
              {/* TODO: Add a Link or button to edit the event */}
              {/* <Link to={`/admin/events/edit/${event.id}`}>Edit</Link> */}
              {/* TODO: Add a button to delete the event */}
              {/* <button onClick={() => handleDeleteEvent(event.id)}>Delete</button> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventListPage;
