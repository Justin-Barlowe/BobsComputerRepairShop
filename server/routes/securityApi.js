// Name: Justin Barlowe, Nolan Berryhill, John Davidson
// Date: 02/19/2024
// File: server/routes/securityApi.js
// Purpose: This file contains the security API routes, Register, verifyUser, verifySecurityQuestion, and resetPassword.

// imports statements
const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Verify Security Questions
router.post("/:email/securityQuestions", async (req, res, next) => {
  try {
    const email = req.params.email;
    const { securityQuestions } = req.body;

    const user = await performOperation(db => {
      return db.collection("users").findOne({ email: email });
    })

    if (!user) {
      console.error("User not found");
      next({ status: 404, message: "User not found" });
      return;
    };

    if (securityQuestions[0].answer !== user.selectedSecurityQuestions[0].answer ||
      securityQuestions[1].answer !== user.selectedSecurityQuestions[1].answer ||
      securityQuestions[2].answer !== user.selectedSecurityQuestions[2].answer) {
      const err = new Error('Unauthorized')
      err.status = 401
      err.message = 'Unauthorized: Security questions do not match'
      console.log('Security questions do not match', err)
      next(err)
      return
    }

    console.log("User found", user)

    res.send(user)

  } catch (err) {
    console.error("err", err);
    next(err);
  }
});

router.post("/:email/reset-password", async (req, res, next) => {
  try {
    const email = req.params.email;
    const password = req.body.password;

    const user = await performOperation(db => {
      return db.collection("users").findOne({ email: email });
    })

    if (!user) {
    console.error("User not found");
    next({ status: 404, message: "User not found" });
    return;
    };

    const hashedPassword = bcrypt.hashSync(password, 10);

    const result = await performOperation(db => {
      return db.collection("users").updateOne({ email: email }, { $set: { password: hashedPassword } });
    })

    res.status(204).send();
  } catch (err) {
    console.error("err", err);
    next(err);
  }
});

// registerUser API
router.post('/register', async(req, res, next) => {

  // Extract properties from the req.body
  const { userName, password, firstName, lastName, email, securityQuestions } = req.body;

  // Check if required fields were filled out.
  if(!userName || !password || !email || !securityQuestions) {
    return res.status(400).json({ error: 'Fill out the required fields' })
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10); // Hash the user's plaintext password before storing it in the database.
    const existingUser = await User.findOne({email: email}); // Check if entered email already exists.

    // If the email is already in use, respond with 404.
    if (existingUser) {
      return res.status(409).json({ message: 'This email is already registered under a different account.'})
    }

    // Create a new user document in the User collection with properties for username, password(hashed), and email.
    const newUser = new User({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      role: "user",
      securityQuestions: securityQuestions
    });

    // Save the the new document to the User collection.
    await newUser.save();

    // Respond with 201 status code and the newly generated data.
    res.status(201).json({ message: 'New user created', user: newUser });

    // Resolve unhandled errors.
  } catch (err) {
    console.error('err', err)
    return res.status(500).json({ error: 'Internal server error'})
  }
})

// VerifyUser API
router.get('/register/:email', async(req, res, next) => {

  try {
    // Extract the email from the request parameters.
    const { email } = req.params;
    // Find a user with a specified email in the database.
    const existingUser = await User.findOne({ email: email})

    // If entered email does not exist in the database, respond with a 400 status and json message.
    if(!existingUser) {
      console.error('err', err)
      return res.status(400).json({ message: 'The email you entered does not exist.' })
    }

    // If the email exists, respond with a 200 status code and send the data of the user.
    res.status(200).send(existingUser)

  } catch (err) {
    // If an error occurs during execution, respond with a 500 status code and an error message.
    res.status(500).json({ message: 'Internal server error'})
  }
})

// Export router
module.exports = router;