import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    const res = await axios.get('https://student-menu-app.onrender.com/api/locations');
    setLocations(res.data);
  };

  const handleAddLocation = async () => {
    if (!newLocation.trim()) return;
    try {
      await axios.post('https://student-menu-app.onrender.com/api/locations', {
        name: newLocation,
      });
      setNewLocation('');
      fetchLocations();
      alert("Location added!");
    } catch (err) {
      console.error("Failed to add location:", err);
      alert("Error adding location: " + err.message);
    }
  };
  

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!image || !selectedLocation) {
      alert('Please select a location and an image!');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', image);
    formData.append('locationId', selectedLocation);
  
    await axios.post('https://student-menu-app.onrender.com/api/images', formData);
    alert('Image uploaded successfully!');
    setImage(null);
  };
  

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Panel</h2>

      {/* Add Location */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Add New Location</h4>
        <input
          type="text"
          placeholder="Enter location name"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
        />
        <button onClick={handleAddLocation}>Add Location</button>
      </div>

      {/* Upload Image */}
      <div>
        <h4>Upload Image</h4>
        <form onSubmit={handleImageUpload}>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">-- Select Location --</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
          <br /><br />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <br /><br />
          <button type="submit">Upload Image</button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
