const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const locationsRoutes = require('./routes/locations');
const imagesRoutes = require('./routes/images');

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/locations', locationsRoutes);
app.use('/api/images', imagesRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
