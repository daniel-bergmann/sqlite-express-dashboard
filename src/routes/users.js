// routes/users.js
const express = require("express")
const sqlite3 = require("sqlite3").verbose()

const router = express.Router()
const db = new sqlite3.Database("./database.db")

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

router.post("/", (req, res) => {
  const { username, email, password } = req.body
  db.run(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password],
    function (err) {
      if (err) {
        console.error(err)
        res.status(500).send("Internal Server Error")
      } else {
        res.json({ id: this.lastID, username, email })
      }
    }
  )
})

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

module.exports = router
