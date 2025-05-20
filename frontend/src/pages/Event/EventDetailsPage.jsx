import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventById } from '../../services/eventService'; // Import the event service
import { generateEventReport } from '../../services/reportService'; // Import the report service

const EventDetailsPage = () => {
  // Get the eventId from the URL parameters
  const { eventId } = useParams();
  // State to store event details
  const [event, setEvent] = useState(null);
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(true);
  // State to handle errors
  const [error, setError] = useState(null);
  // State to manage report generation loading
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  // State to manage report generation error
  const [reportError, setReportError] = useState(null);

  // Effect to fetch event details when eventId changes
  useEffect(() => {
    const fetchEventDetails = async () => {
      setIsLoading(true); // Start loading
      setError(null); // Clear previous errors
      try {
        // Call the getEventById function from eventService
        // TODO: Implement getEventById in eventService.js to make an API call
        // Assumption: getEventById takes eventId and returns event details
        const eventData = await getEventById(eventId);
        setEvent(eventData);
      } catch (err) {
        console.error('Error fetching event details:', err);
        setError("Error fetching event details.");
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    if (eventId) {
      fetchEventDetails(); // Fetch details if eventId is available
    }
  }, [eventId]); // Effect depends on eventId

  // Handler for generating and downloading the report
  const handleDownloadReport = async () => {
    setIsGeneratingReport(true); // Start report generation loading
    setReportError(null); // Clear previous report errors
    try {
      // Call the generateEventReport function from reportService
      // TODO: Implement generateEventReport in reportService.js to make an API call
      // Assumption: generateEventReport takes eventId and returns a Blob or ArrayBuffer for the report file
      const reportData = await generateEventReport(eventId);

      // TODO: Handle the file download based on the reportData format (e.g., Blob for a file)
      // Example for a Blob:
      const blob = new Blob([reportData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // Adjust MIME type as needed
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `attendance_report_event_${eventId}.xlsx`; // TODO: Use event name in filename
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (err) {
      console.error('Error generating report:', err);
      setReportError("Error generating report.");
    } finally {
      setIsGeneratingReport(false); // Stop report generation loading
    }
  };

  // Render loading, error, or event details
  if (isLoading) {
    return <div>Loading event details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // If event is not found or null after loading
  if (!event) {
    return <div>Event not found.</div>;
  }

  // TODO: Add better styling and display of event details

  return (
    <div>
      <h2>Event Details</h2>
      {/* Display event information */}
      <p><strong>Event Name:</strong> {event.name}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Sessions:</strong> {event.sessions}</p>
      {/* TODO: Display other event details */}

      {/* Button to download attendance report */}
      <button onClick={handleDownloadReport} disabled={isGeneratingReport}>
        {isGeneratingReport ? 'Generating Report...' : 'Download Attendance Report'}
      </button>
      {/* Display report generation error */}
      {reportError && <p style={{ color: 'red' }}>{reportError}</p>}

      {/* TODO: Add a link to edit the event */}
      {/* <Link to={`/admin/events/edit/${eventId}`}>Edit Event</Link> */}
    </div>
  );
};

export default EventDetailsPage;
