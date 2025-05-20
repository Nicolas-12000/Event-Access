import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
// Assuming an AttendanceConfirmation component exists
import AttendanceConfirmation from '../components/AttendanceConfirmation';
// Import the useAuth hook
import { useAuth } from '../contexts/AuthContext';
import { getQrDetailsById } from '../services/qrService';

const ScanRedirectPage = () => {
  // Get the qrId from the URL parameters
  const { qrId } = useParams();
  // Hook for programmatic navigation
  const navigate = useNavigate();
  // Hook to access the current location's state (for redirection to login)
  const location = useLocation();
  // Use the isAuthenticated status and isLoading from AuthContext
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth(); // Renamed isLoading to avoid conflict

  // State to manage loading status specifically for data fetching
  const [isDataLoading, setIsDataLoading] = useState(true);

  // State to store fetched QR details
  const [studentName, setStudentName] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventSessions, setEventSessions] = useState(0);

  // State to handle errors during data fetching
  const [fetchError, setFetchError] = useState(null);

  // Effect to handle authentication check and redirection
  useEffect(() => {
    // If authentication status is not yet determined, do nothing
    if (isAuthLoading) {
      return;
    }

    // If authentication check is complete and user is NOT authenticated, redirect to login
    if (!isAuthenticated) {
      // Redirect to login page, preserving the current location in the state
      // This allows the login page to redirect back here after successful login
      navigate(`/login`, { state: { from: location.pathname } });
    }

    // This effect only depends on isAuthenticated and isAuthLoading to react to auth changes
    // Added location as a dependency because we use location.pathname
  }, [isAuthenticated, isAuthLoading, navigate, location]);


  // Effect to fetch QR data if authenticated and qrId is available
  useEffect(() => {
    // Only proceed with data fetching if:
    // 1. Authentication status is determined (not isAuthLoading)
    // 2. User is authenticated (isAuthenticated)
    // 3. qrId is available
    // 4. We are not already loading data (not isDataLoading - although this effect controls it, a check can be useful in complex scenarios)
    if (!isAuthLoading && isAuthenticated && qrId) {
      const fetchQrData = async () => {
        setIsDataLoading(true); // Start loading data
        setFetchError(null); // Clear any previous errors
        try {
          // TODO: Replace with actual API call to your backend
          // This API call should fetch student and event details based on the qrId
          // Assumption: getQrDetailsById is a function in your qrService.js that makes the API call
          const data = await getQrDetailsById(qrId);

          // Assumption: The backend API returns an object like { studentName: '...', eventName: '...', eventSessions: ... }
          // If your backend returns a different structure, you'll need to adjust these lines.
          setStudentName(data.studentName);
          setEventName(data.eventName);
          setEventSessions(data.eventSessions);

        } catch (error) {
          // Handle errors during the API call
          setFetchError("Error fetching QR details.");
          console.error("Error fetching QR details:", error);
        } finally {
          setIsDataLoading(false); // Stop loading after data fetch attempt
        }
      };
      fetchQrData(); // Call the fetch function
    }
    // Dependencies for this effect: authentication status, auth loading status, and qrId
    // We include isAuthenticated to react to changes in auth status (e.g., after login)
    // We include isAuthLoading to ensure we only fetch data after the initial auth check
    // We include qrId because the data fetching depends on it
  }, [isAuthLoading, isAuthenticated, qrId, navigate]);


  // Render different content based on loading state and errors
  if (fetchError) {
    // Display an error message if fetching data failed
    return <div>Error: {fetchError}</div>;
  }

  // Show loading indicator if authentication is in progress OR data is being fetched
  if (isAuthLoading || isDataLoading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  // If authenticated and data is loaded (or fetching failed, handled by fetchError),
  // display the attendance confirmation component
  // Pass the fetched details and qrId to the confirmation component
  // Note: AttendanceConfirmation should handle cases where data might be partial due to fetchError, if necessary.
  if (isAuthenticated) {
    return (
      <div>
        <AttendanceConfirmation
          qrId={qrId}
          studentName={studentName}
          eventName={eventName}
          eventSessions={eventSessions}
        />
      </div>
    );
  }

  // If none of the above conditions are met (e.g., not authenticated and not loading),
  // the first effect should have triggered a redirect to the login page.
  // This return null acts as a fallback, though ideally, it shouldn't be reached in a correct flow.
  return null;
};

export default ScanRedirectPage;
