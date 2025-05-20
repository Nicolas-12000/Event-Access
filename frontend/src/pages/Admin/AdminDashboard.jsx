import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome to the admin dashboard.</p>

      <ul>
        <li><Link to="/admin/events">Manage Events</Link></li>
        <li><Link to="/admin/students">Manage Students</Link></li>
        <li><Link to="/admin/reports">Reports</Link></li>
        <li><Link to="/admin/upload">Upload Students</Link></li>
        {/* Agrega más enlaces si tienes más funcionalidades */}
      </ul>
    </div>
  );
};

export default AdminDashboard;
