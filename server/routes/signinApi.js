/**
 * Title: signinApi.js
 * Author: Nolan Berryhill, Justin Barlowe, John Davidson
 * Date: 02/17/2024
 */

// imports statements
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const router = express.Router();

const saltRounds = 10;

// Signin to the website
router.post("/", async (req, res) => {
  // Find the email within the saved profile
  try {
    const user = await User.findOne({ email: req.body.email });
    // If email is found match with password
    if (user) {
      let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      // If they match allow them to sign in
      if (passwordIsValid) {
        console.log("Login successful");

        user.lastLoggedIn = Date.now();
        await user.save();

        return res.status(200).json({ status: 200, message: 'Login successful', user: user });

      } // If they don't match throw error for email or password
        else {
        console.log("Invalid password: Please try again");
        return res.status(401).json({ status: 401, message: 'Invalid password: Please try again' });
      }
    } else {
      console.log(`Invalid email: ${req.body.userName}. Please try again`);
      return res.status(401).json({ status: 401, message: 'Invalid email: Please try again' });
    }
  } // Throw error if Internal server error happens
    catch (err) {
    console.error(err);
    return res.status(500).json({ status: 500, message: 'Internal Server Error', error: err });
  }
});

// Export router
module.exports = router;
