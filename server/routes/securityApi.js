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
router.post("/:email/securityquestions", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`User with email $[email] not found.`);
      return res.status(404).json({ status: 404, message: `User with email ${email} not found.`});
    }

    // Check if the provided security questions match the user's stored answers
    const { securityQuestions } = req.body;
    if (!securityQuestions || !Array.isArray(securityQuestions)) {
      console.log("Invalid security questions provided.");
      return res.status(400).json({ status: 400, message: "Invalid security questions provided." });
    }

    const validAnswers = securityQuestions.every(sq => {
      const userSecurityQuestion = user.securityQuestions.find(usq => usq.question === sq.question);
      return userSecurityQuestion && userSecurityQuestion.answer === sq.answer;
    });

    if (validAnswers) {
      console.log("Security questions verified successfully. User can proceed.");
      return res.status(200).json({ status: 200, message: "Security questions verified successfully. User can proceed.", user });
    } else {
      console.log("Invalid security answers provided.");
      return res.status(401).json({ status: 401, message: "Invalid security answers provided." });
    }
  } catch (err) {
    console.error("Internal Server Error:", err);
    return res.status(500).json({ status: 500, message: "Internal Server Error", error: err});
  }
});

router.post("/:email/reset-password", async (req, res) => {
  try {
    const { email } = req.params;
    const { newPassword } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`User with email ${email} not found.`);
      return res.status(404).json({ status: 404, message: `User with email ${email} not found.` });
    }

    // Update the user's password
    user.password = newPassword;
    await user.saver();

    console.log(`password reset successfully for user with email ${email}.`);
    return res.status(200).json({ status: 200, message: `Password reset successfully for user with email ${email}.` });
  } catch (err) {
    console.error("Internal Server Error:", err);
    return res.status(500).json({ status: 500, message: "Internal Server Error", error: err });
  }
});

// registerUser API
router.post('/register', async(req, res, next) => {

  // Extract properties from the req.body
  const { userName, password, email, securityQuestion1, securityAnswer1, securityQuestion2, securityAnswer2, securityQuestion3, securityAnswer3 } = req.body;

  // Check if username and password were entered.
  if(!userName || !password, !email, !securityQuestion1, !securityAnswer1, !securityQuestion2, !securityAnswer2, !securityQuestion3, !securityAnswer3) {
    return res.status(400).json({ error: 'Username and password are required.' })
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10); // Hash the user's plaintext password before storing it in the database.
    const existingUser = await User.findOne({email: email}); // Check if entered email already exists.

    // If the email is already in use, respond with 404.
    if (existingUser) {
      return res.status(404).json({ message: 'This email is already registered under a different account.'})
    }

    // Create a new user document in the User collection with properties for username, password(hashed), and email.
    const newUser = new User({
      userName,
      password: hashedPassword,
      email,
      securityQuestions: [
        { question: securityQuestion1, answer: securityAnswer1 },
        { question: securityQuestion2, answer: securityAnswer2 },
        { question: securityQuestion3, answer: securityAnswer3 }
      ]
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