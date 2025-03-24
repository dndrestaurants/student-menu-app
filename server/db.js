const Database = require('better-sqlite3');
const db = new Database('./menu.db');

// No need for db.serialize — just export


db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS locations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    location_id INTEGER,
    FOREIGN KEY(location_id) REFERENCES locations(id)
  )`);
});

module.exports = db;
