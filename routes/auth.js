const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = {}; // This is a temporary in-memory store

router.post("/register", (req, res) => {
  const username = req.body.username;
  const plainTextPassword = req.body.password;

  bcrypt.hash(plainTextPassword, 10, function (err, hash) {
    users[username] = { passwordHash: hash };
    res.send("Registration successful");
  });
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const plainTextPassword = req.body.password;

  if (!users[username]) {
    return res.status(400).send("Invalid username");
  }

  bcrypt.compare(
    plainTextPassword,
    users[username].passwordHash,
    function (err, result) {
      if (result) {
        // Passwords match
        const token = jwt.sign({ username: username }, "secret-key", {
          expiresIn: "1h",
        });
        res.send({ token: token });
      } else {
        // Passwords don't match
        res.status(400).send("Invalid password");
      }
    }
  );
});

module.exports = router;
