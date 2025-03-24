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
      alert('Location added!');
    } catch (err) {
      alert('Error adding location');
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

    try {
      await axios.post('https://student-menu-app.onrender.com/api/images', formData);
      alert('Image uploaded successfully!');
      setImage(null);
    } catch (err) {
      alert('Image upload failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Admin Panel</h2>

      {/* Add Location */}
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 mb-10">
        <h4 className="text-lg font-semibold mb-4">Add New Location</h4>
        <input
          type="text"
          placeholder="Enter location name"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddLocation}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Location
        </button>
      </div>

      {/* Upload Image */}
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
        <h4 className="text-lg font-semibold mb-4">Upload Image</h4>
        <form onSubmit={handleImageUpload}>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none"
          >
            <option value="">-- Select Location --</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full mb-4"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Upload Image
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
