const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all locations
router.get('/', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM locations').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get locations', details: err });
  }
});

// Add a new location
router.post('/', (req, res) => {
  const { name } = req.body;
  try {
    const stmt = db.prepare('INSERT INTO locations (name) VALUES (?)');
    const info = stmt.run(name);
    res.json({ id: info.lastInsertRowid, name });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add location', details: err });
  }
});

module.exports = router;
