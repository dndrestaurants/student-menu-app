const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM locations', [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { name } = req.body;
  db.run('INSERT INTO locations (name) VALUES (?)', [name], function(err) {
    if (err) return res.status(500).json(err);
    res.json({ id: this.lastID, name });
  });
});

module.exports = router;
