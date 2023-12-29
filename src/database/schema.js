const sqlite3 = require("sqlite3").verbose()

function initializeDatabase(db) {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      username TEXT,
      password TEXT
    )
  `)
}

module.exports = initializeDatabase
