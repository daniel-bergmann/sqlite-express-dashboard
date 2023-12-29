// database/schema.js
const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./database.db")

// Add a version variable
const dbVersion = 2

// Check if the database version matches the expected version
db.get("PRAGMA user_version", (err, row) => {
  if (err) {
    console.error(err)
    return
  }

  if (row.user_version < dbVersion) {
    // Update the schema
    db.run(`
      -- Update the schema
      -- For example, add a new column
      ALTER TABLE users ADD COLUMN age INTEGER;
    `)

    // Update the database version
    db.run(`PRAGMA user_version = ${dbVersion}`)
  }
})

// Create users table if not exists (initial creation)
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    username TEXT,
    password TEXT
  )
`)

module.exports = db
