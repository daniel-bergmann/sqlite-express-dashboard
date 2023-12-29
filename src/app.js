const express = require("express")
const usersRoutes = require("./routes/users")
const sqlite3 = require("sqlite3").verbose()
const initializeDatabase = require("./database/schema")

const app = express()
const port = 3000

// Connecting to SQLite database
const db = new sqlite3.Database("./sqlite.db")

// Initialize the database schema
initializeDatabase(db)

app.use(express.json())

// Routes with the database connection passed as a parameter
app.use("/users", usersRoutes(db))

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
