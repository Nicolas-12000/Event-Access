import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // TODO: Add more dashboard content and links as needed

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome to the admin dashboard.</p>

      {/* Navigation links to other admin pages */}
      <ul>
        {/* TODO: Add a link to the Event List page */}
        <li><Link to="/admin/events">Manage Events</Link></li>
        {/* TODO: Add a link to the Student List page */}
        <li><Link to="/admin/students">Manage Students</Link></li>
        {/* TODO: Add a link to other admin functionalities */}
      </ul>

      {/* TODO: Add summary statistics or recent activity */}
    </div>
  );
};

export default AdminDashboard;
