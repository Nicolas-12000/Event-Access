import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/events">Events</Link></li>
        {/* Agrega más enlaces según tu app */}
      </ul>
    </nav>
  );
};

export default Navbar;