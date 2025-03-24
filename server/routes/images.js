const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../db');
const router = express.Router();

// Setup multer for image uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Upload image for a location
router.post('/', upload.single('image'), (req, res) => {
  const locationId = req.body.locationId;
  const imageUrl = `/uploads/${req.file.filename}`;

  try {
    const stmt = db.prepare('INSERT INTO images (url, location_id) VALUES (?, ?)');
    const info = stmt.run(imageUrl, locationId);
    res.json({ id: info.lastInsertRowid, url: imageUrl });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload image', details: err });
  }
});

// Get images for a specific location
router.get('/:locationId', (req, res) => {
  const locationId = req.params.locationId;
  try {
    const rows = db.prepare('SELECT * FROM images WHERE location_id = ?').all(locationId);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get images', details: err });
  }
});

module.exports = router;
