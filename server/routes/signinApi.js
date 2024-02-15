const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const router = express.Router();

const saltRounds = 10;

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (passwordIsValid) {
        console.log("Login successful");
        return res.status(200).json({ status: 200, message: 'Login successful', user: user });
      } else {
        console.log("Invalid password: Please try again");
        return res.status(401).json({ status: 401, message: 'Invalid password: Please try again' });
      }
    } else {
      console.log(`Invalid username: ${req.body.userName}. Please try again`);
      return res.status(401).json({ status: 401, message: 'Invalid username: Please try again' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 500, message: 'Internal Server Error', error: err });
  }
});

module.exports = router;
