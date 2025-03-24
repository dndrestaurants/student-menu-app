import React, { useState, useEffect } from 'react';
import axios from 'axios';

function User() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      fetchImages(selectedLocation);
    }
  }, [selectedLocation]);

  const fetchLocations = async () => {
    const res = await axios.get('https://student-menu-app.onrender.com/api/locations');
    setLocations(res.data);
  };

  const fetchImages = async (locationId) => {
    const res = await axios.get(`https://student-menu-app.onrender.com/api/images/${locationId}`);
    setImages(res.data);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Page - View Food Images</h2>

      {/* Location Dropdown */}
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', marginTop: '10px' }}
      >
        <option value="">-- Select Location --</option>
        {locations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.name}
          </option>
        ))}
      </select>

      {/* Image Gallery */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '16px',
          marginTop: '20px',
        }}
      >
        {images.map((img) => (
          <div key={img.id} style={{ maxWidth: '100%' }}>
            <img
              src={`https://student-menu-app.onrender.com${img.url}`}
              alt="Food"
              style={{
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
