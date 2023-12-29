const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const env = require("dotenv").config()

function initializeRoutes(db) {
  // +++++++++
  //  REGISTER route
  // +++++++++

  router.post("/register", async (req, res) => {
    const { username, email, password } = req.body
    try {
      // checking if the user already exists or registers with the same email
      const existingUser = await getUserByEmail(email)
      if (existingUser) {
        return res.status(409).send("User already exists")
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      db.run(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        function (err) {
          if (err) {
            console.error(err)
            res.status(500).send("Internal Server Error")
          } else {
            res.json({ id: this.lastID, username, email })
          }
        }
      )
    } catch (error) {
      console.error(error)
      res.status(500).send("Internal Server Error")
    }
  })

  // +++++++++++
  //  LOGIN route
  // +++++++++++
  

  router.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
      const user = await getUserByEmail(email)
      if (!user) {
        return res.status(401).send("User not found")
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password)

      if (!isPasswordCorrect) {
        return res.status(401).send("Incorrect password")
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      })

      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        token,
      })
    } catch (error) {
      console.error(error)
      res.status(500).send("Internal Server Error")
    }
  })

  // ++++++++++++++++
  // Get all users
  // ++++++++++++++++

  router.get("/", (req, res) => {
    db.all("SELECT [id], [email], [username] FROM users", (err, rows) => {
      if (err) {
        console.error(err)
        res.status(500).send("Internal Server Error")
      } else {
        res.json(rows)
      }
    })
  })

  // ++++++++++++++++
  // Get a user by ID
  // ++++++++++++++++

  router.get("/:id", (req, res) => {
    const userId = req.params.id
    db.get("SELECT * FROM users WHERE id = ?", [userId], (err, row) => {
      if (err) {
        console.error(err)
        res.status(500).send("Internal Server Error")
      } else if (row) {
        res.json(row)
      } else {
        res.status(404).send("User not found")
      }
    })
  })

  // ++++++++++++++++
  // Update a user by ID
  // ++++++++++++++++

  router.put("/:id", (req, res) => {
    const userId = req.params.id
    const { username, email } = req.body
    db.run(
      "UPDATE users SET username = ?, email = ? WHERE id = ?",
      [username, email, userId],
      (err) => {
        if (err) {
          console.error(err)
          res.status(500).send("Internal Server Error")
        } else {
          res.json({ id: userId, username, email })
        }
      }
    )
  })

  // ++++++++++++++++
  // Delete a user by ID
  // ++++++++++++++++

  router.delete("/:id", (req, res) => {
    const userId = req.params.id
    db.run("DELETE FROM users WHERE id = ?", [userId], (err) => {
      if (err) {
        console.error(err)
        res.status(500).send("Internal Server Error")
      } else {
        res.send(`User with ID ${userId} deleted`)
      }
    })
  })

  // +++++++++++++++++++
  // Get a user by email
  // +++++++++++++++++++

  async function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
        if (err) {
          reject(err)
        } else {
          resolve(row)
        }
      })
    })
  }
  return router
}

module.exports = initializeRoutes
