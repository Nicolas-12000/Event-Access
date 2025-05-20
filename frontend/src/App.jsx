import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';


import Navbar from './components/Navbar';


import LoginPage from './pages/Admin/LoginPage';
import ScanRedirectPage from './pages/ScanRedirectPage';
import AttendanceConfirmation from './components/AttendanceConfirmation'; 
import AdminDashboard from './pages/Admin/AdminDashboard';
import EventDetailsPage from './pages/Event/EventDetailsPage';
import EventListPage from './pages/Admin/EventListPage';
import CreateEventPage from './pages/Admin/CreateEventPage';
import EditEventPage from './pages/Admin/EditEventPage';
import StudentListPage from './pages/Admin/StudentListPage';
import CreateStudentPage from './pages/Admin/CreateStudentPage';
import EditStudentPage from './pages/Admin/EditStudentPage';
import NotFoundPage from './pages/NotFoundPage'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/scan/:qrId" element={<ScanRedirectPage />} />
          <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/events" element={<EventListPage />} />
            <Route path="/admin/events/create" element={<CreateEventPage />} />
            <Route path="/admin/events/edit/:eventId" element={<EditEventPage />} /> {/* Dynamic route for editing */}
            <Route path="/admin/students" element={<StudentListPage />} />
            <Route path="/admin/students/create" element={<CreateStudentPage />} />
            <Route path="/admin/students/edit/:studentId" element={<EditStudentPage />} /> {/* Dynamic route for editing */}
          </Route>
           <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
