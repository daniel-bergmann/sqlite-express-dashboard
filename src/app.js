const express = require("express")
const usersRoutes = require("./routes/users")
const sqlite3 = require("sqlite3").verbose()
const userSchema = require("./sql/users")

const app = express()
const port = 3000

// Create and connect to SQLite database
const db = new sqlite3.Database("./database.db")

// Middleware to parse JSON requests
app.use(express.json())

// Use the users routes
app.use("/users", usersRoutes)

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
