import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // Import the AuthProvider
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

// Import your page components
import LoginPage from './pages/Admin/LoginPage';
import ScanRedirectPage from './pages/ScanRedirectPage';
import AttendanceConfirmation from './components/AttendanceConfirmation'; // Assuming this is a standalone page for now
import AdminDashboard from './pages/Admin/AdminDashboard';
import EventDetailsPage from './pages/Event/EventDetailsPage';
import EventListPage from './pages/Admin/EventListPage';
import CreateEventPage from './pages/Admin/CreateEventPage';
import EditEventPage from './pages/Admin/EditEventPage';
import StudentListPage from './pages/Admin/StudentListPage';
import CreateStudentPage from './pages/Admin/CreateStudentPage';
import EditStudentPage from './pages/Admin/EditStudentPage';

function App() {
  return (
    // Wrap the application with the AuthProvider to provide authentication context
    <AuthProvider>
      <Router>
        {/* TODO: Add a navigation bar or header */}
        {/* <Navbar /> */}
        <Routes>
          {/* Public Routes */}
          {/* Route for the login page */}
          <Route path="/login" element={<LoginPage />} />
          {/* Route for handling QR scan redirects */}
          <Route path="/scan/:qrId" element={<ScanRedirectPage />} />
          {/* TODO: Define a route for the AttendanceConfirmation if it's a full page */}
          {/* <Route path="/confirm-attendance" element={<AttendanceConfirmation />} /> */}

          {/* Protected Routes (requires authentication) */}
          {/* Wrap routes that require authentication with ProtectedRoute */}
          {/* Example: Admin Dashboard requires ADMIN role */}
          <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
             {/* Route for the admin dashboard */}
            <Route path="/admin" element={<AdminDashboard />} />
            {/* Routes for managing events */}
            <Route path="/admin/events" element={<EventListPage />} />
            <Route path="/admin/events/create" element={<CreateEventPage />} />
            <Route path="/admin/events/edit/:eventId" element={<EditEventPage />} /> {/* Dynamic route for editing */}
            {/* Routes for managing students */}
            <Route path="/admin/students" element={<StudentListPage />} />
            <Route path="/admin/students/create" element={<CreateStudentPage />} />
            <Route path="/admin/students/edit/:studentId" element={<EditStudentPage />} /> {/* Dynamic route for editing */}
            {/* TODO: Add routes for other admin functionalities */}
          </Route>

           {/* Protected Routes (requires authentication, no specific role) */}
           {/* <Route element={<ProtectedRoute />}>
              {/* Example: Event Details page might only require authentication }
              <Route path="/events/:eventId" element={<EventDetailsPage />} /> {/* Dynamic route for event details }
              {/* TODO: Add other routes that require authentication but no specific role }
           </Route> */}

          {/* Default route or homepage */}
          {/* TODO: Define a suitable homepage or redirect */}
          {/* <Route path="/" element={<Homepage />} /> */}
          {/* Or redirect to login if no homepage */}
           <Route path="/" element={<Navigate to="/login" />} />

          {/* TODO: Add a 404 Not Found page */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
