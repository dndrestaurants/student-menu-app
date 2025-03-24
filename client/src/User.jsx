import React, { useEffect, useState } from 'react';
import axios from 'axios';

function User() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    const res = await axios.get('https://student-menu-app.onrender.com/api/locations');
    setLocations(res.data);
  };

  const fetchImages = async (locationId) => {
    const res = await axios.get(`https://student-menu-app.onrender.com/api/images/${locationId}`);
    setImages(res.data);
  };

  const handleLocationChange = (e) => {
    const locationId = e.target.value;
    setSelectedLocation(locationId);
    if (locationId) {
      fetchImages(locationId);
    } else {
      setImages([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">View Menu by Location</h2>

      {/* Location Dropdown */}
      <div className="w-full max-w-md mb-6">
        <select
          value={selectedLocation}
          onChange={handleLocationChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">-- Select Location --</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {images.map((img) => (
          <div
            key={img.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={`https://student-menu-app.onrender.com${img.url}`}
              alt="Uploaded"
              className="w-full h-60 object-cover"
            />
          </div>
        ))}
      </div>

      {images.length === 0 && selectedLocation && (
        <p className="text-gray-500 mt-8">No images found for this location.</p>
      )}
    </div>
  );
}

export default User;
