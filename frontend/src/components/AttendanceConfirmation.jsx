import React, { useState } from 'react';
import { registerAttendance } from '../services/attendanceService';

const AttendanceConfirmation = ({ qrId, studentName, eventName, eventSessions }) => {
  const [selectedSession, setSelectedSession] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSessionChange = (event) => {
    setSelectedSession(event.target.value);
  };

  const handleConfirmAttendance = async () => {
    if (!selectedSession) {
      setMessage({ type: 'error', text: 'Please select a session.' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const result = await registerAttendance({
        qrId,
        numberOfSessions: selectedSession
      });

      if (result && result.success) {
        setMessage({ type: 'success', text: 'Attendance registered successfully!' });
      } else {
        setMessage({ type: 'error', text: result.message || 'Attendance registration failed.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred during registration.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Attendance Confirmation</h2>
      <p><strong>Student:</strong> {studentName}</p>
      <p><strong>Event:</strong> {eventName}</p>

      <div>
        <label htmlFor="session">Select Session:</label>
        <select id="session" value={selectedSession} onChange={handleSessionChange}>
          <option value="">-- Select --</option>
          {Array.from({ length: eventSessions }, (_, i) => i + 1).map(session => (
            <option key={session} value={session}>Session {session}</option>
          ))}
        </select>
      </div>

      <button onClick={handleConfirmAttendance} disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Confirm Attendance'}
      </button>

      {message && (
        <p style={{ color: message.type === 'success' ? 'green' : 'red' }}>
          {message.text}
        </p>
      )}
    </div>
  );
};

export default AttendanceConfirmation;
