const Database = require('better-sqlite3');
const db = new Database('./menu.db');

// Create locations table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS locations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`).run();

// Create images table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    location_id INTEGER,
    FOREIGN KEY(location_id) REFERENCES locations(id)
  )
`).run();

module.exports = db;
