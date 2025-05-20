import React, { useState } from 'react';
import { registerAttendance } from '../services/attendanceService'; // Import the attendance service

// Assumption: This component receives qrId, studentName, eventName, and eventSessions as props
const AttendanceConfirmation = ({ qrId, studentName, eventName, eventSessions }) => {
  // State to manage the selected session
  const [selectedSession, setSelectedSession] = useState('');
  // State to manage loading state during attendance registration
  const [isLoading, setIsLoading] = useState(false);
  // State to manage success or error messages after registration
  const [message, setMessage] = useState(null);

  // Handler for session selection change
  const handleSessionChange = (event) => {
    setSelectedSession(event.target.value);
  };

  // Handler for attendance registration
  const handleConfirmAttendance = async () => {
    if (!selectedSession) {
      setMessage({ type: 'error', text: 'Please select a session.' });
      return;
    }

    setIsLoading(true); // Start loading
    setMessage(null); // Clear previous messages

    try {
      // Call the registerAttendance function from attendanceService
      // TODO: Implement registerAttendance in attendanceService.js to make an API call to your backend
      // Assumption: registerAttendance takes qrId and selectedSession and returns a success/error indicator
      const result = await registerAttendance(qrId, selectedSession);

      // Assumption: The result indicates success or failure
      if (result && result.success) {
        setMessage({ type: 'success', text: 'Attendance registered successfully!' });
        // TODO: Optionally, disable the form or redirect after successful registration
      } else {
        // Handle registration failure based on the result structure
        setMessage({ type: 'error', text: result.message || 'Attendance registration failed.' });
      }
    } catch (error) {
      console.error('Error registering attendance:', error);
      setMessage({ type: 'error', text: 'An error occurred during registration.' });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // TODO: Add better styling and UI for session selection and confirmation

  return (
    <div>
      <h2>Attendance Confirmation</h2>
      {/* Display student and event details */}
      <p><strong>Student:</strong> {studentName}</p>
      <p><strong>Event:</strong> {eventName}</p>

      {/* Session selection */}
      <div>
        <label htmlFor="session">Select Session:</label>
        {/* TODO: Dynamically generate session options based on eventSessions */}
        {/* Assumption: eventSessions is the total number of sessions */}
        <select id="session" value={selectedSession} onChange={handleSessionChange}>
          <option value="">-- Select --</option>
          {/* Example static options - replace with dynamic generation */}
          {Array.from({ length: eventSessions }, (_, i) => i + 1).map(session => (
            <option key={session} value={session}>Session {session}</option>
          ))}
        </select>
      </div>

      {/* Confirmation button */}
      <button onClick={handleConfirmAttendance} disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Confirm Attendance'}
      </button>

      {/* Display messages */}
      {message && (
        <p style={{ color: message.type === 'success' ? 'green' : 'red' }}>
          {message.text}
        </p>
      )}
    </div>
  );
};

export default AttendanceConfirmation;
