const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
// for hashing password

const { sign } = require("jsonwebtoken");
//jsonwebtoken for authentication
router.post("/registration", async (req, res, next) => {
  const { username, password } = req.body;
 bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("yeah");
  });

});

  
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const founduser = await Users.findOne({ where: { username: username } });
  if (!founduser) {
    res.json({ error: "User doesn't exist" });
  }

  bcrypt.compare(password, founduser.password).then((match) => {
    if (!match) {
      res.json({ error: "Wrong username/password" });
    }
    const accessToken = sign(
      { username: founduser.username, id: founduser.id },
      "important secret"
    );

    res.json(accessToken);
  });
});

module.exports = router;
