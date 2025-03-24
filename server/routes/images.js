const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const db = require('../db');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
  const locationId = req.body.locationId;
  const imageUrl = `/uploads/${req.file.filename}`;
  db.run(
    'INSERT INTO images (url, location_id) VALUES (?, ?)',
    [imageUrl, locationId],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID, url: imageUrl });
    }
  );
});

router.get('/:locationId', (req, res) => {
  const { locationId } = req.params;
  db.all(
    'SELECT * FROM images WHERE location_id = ?',
    [locationId],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

module.exports = router;
