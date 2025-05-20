import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventById } from '../../services/eventService';
import { generateEventReport } from '../../services/reportService';

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportError, setReportError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const eventData = await getEventById(eventId);
        setEvent(eventData);
      } catch (err) {
        console.error('Error fetching event details:', err);
        setError("Error fetching event details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  const handleDownloadReport = async () => {
    setIsGeneratingReport(true);
    setReportError(null);
    try {
      const reportData = await generateEventReport(eventId);
      const blob = new Blob([reportData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `attendance_report_event_${eventId}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error generating report:', err);
      setReportError("Error generating report.");
    } finally {
      setIsGeneratingReport(false);
    }
  };

  if (isLoading) {
    return <div>Loading event details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>Event not found.</div>;
  }

  return (
    <div>
      <h2>Event Details</h2>
      <p><strong>Name:</strong> {event.name}</p>
      <p><strong>Number of Sessions:</strong> {event.numberOfSessions}</p>
      <p><strong>Place:</strong> {event.place}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Start Date:</strong> {event.startDate}</p>
      <p><strong>End Date:</strong> {event.endDate}</p>

      <button onClick={handleDownloadReport} disabled={isGeneratingReport}>
        {isGeneratingReport ? 'Generating Report...' : 'Download Attendance Report'}
      </button>
      {reportError && <p style={{ color: 'red' }}>{reportError}</p>}

      <Link to={`/admin/events/edit/${eventId}`}>Edit Event</Link>
    </div>
  );
};

export default EventDetailsPage;
