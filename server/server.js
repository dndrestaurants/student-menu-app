const express = require('express');
const cors = require('cors');
const app = express();
const locationsRoutes = require('./routes/locations');
const imagesRoutes = require('./routes/images');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/locations', locationsRoutes);
app.use('/api/images', imagesRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
