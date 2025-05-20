import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
// Assuming an AttendanceConfirmation component exists
import AttendanceConfirmation from '../components/AttendanceConfirmation';
// Import the useAuth hook
import { useAuth } from '../contexts/AuthContext';
import { getQrDetailsById } from '../services/qrService';

const ScanRedirectPage = () => {
  const { qrId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth(); 

  const [isDataLoading, setIsDataLoading] = useState(true);

  const [studentName, setStudentName] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventSessions, setEventSessions] = useState(0);

  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    if (!isAuthenticated) {

      navigate(`/login`, { state: { from: location.pathname } });
    }


  }, [isAuthenticated, isAuthLoading, navigate, location]);


  useEffect(() => {
    if (!isAuthLoading && isAuthenticated && qrId) {
      const fetchQrData = async () => {
        setIsDataLoading(true); 
        setFetchError(null); 
        try {
          const data = await getQrDetailsById(qrId);

          setStudentName(data.studentName);
          setEventName(data.eventName);
          setEventSessions(data.eventSessions);

        } catch (error) {
          setFetchError("Error fetching QR details.");
          console.error("Error fetching QR details:", error);
        } finally {
          setIsDataLoading(false);
        }
      };
      fetchQrData(); 
    }
  }, [isAuthLoading, isAuthenticated, qrId, navigate]);


  if (fetchError) {
    return <div>Error: {fetchError}</div>;
  }

  if (isAuthLoading || isDataLoading) {
    return <div>Loading...</div>; 
  }

  if (isAuthenticated) {
    return (
      <div>
        <h3>Student Information</h3>
        <ul>
          <li><strong>Name:</strong> {studentName}</li>
        </ul>
        <h3>Event Information</h3>
        <ul>
          <li><strong>Name:</strong> {eventName}</li>
          <li><strong>Sessions:</strong> {eventSessions}</li>
        </ul>
        <AttendanceConfirmation
          qrId={qrId}
          studentName={studentName}
          eventName={eventName}
          eventSessions={eventSessions}
        />
      </div>
    );
  }

  return null;
};

export default ScanRedirectPage;
