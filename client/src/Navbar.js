import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Student Menu</h1>
      <div className="space-x-4">
        <Link
          to="/"
          className="text-gray-700 hover:text-blue-600 font-medium transition"
        >
          User
        </Link>
        <Link to="/" className="...">Home</Link>
<Link to="/menu" className="...">User</Link>
<Link to="/admin" className="...">Admin</Link>

        <Link
          to="/admin"
          className="text-gray-700 hover:text-blue-600 font-medium transition"
        >
          Admin
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
