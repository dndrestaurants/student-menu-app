import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to Student Menu</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Browse your location-specific food menu, or log in as admin to upload items and manage locations.
      </p>
      <div className="space-x-4">
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          User View
        </Link>
        <Link
          to="/admin"
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition"
        >
          Admin Panel
        </Link>
      </div>
    </div>
  );
}

export default Home;
