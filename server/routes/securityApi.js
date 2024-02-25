// Name: Justin Barlowe, Nolan Berryhill, John Davidson
// Date: 02/25/2024
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

    // Const gets req.params/body
    const { email } = req.params;
    const { securityQuestions } = req.body;

    // Retrieve the user from MongoDB based on the email
    const user = await User.findOne({ email });

    // Error if user is not found in the database
    if (!user) {
      console.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided answers with the stored security questions' answers
    const storedSecurityQuestions = user.securityQuestions;

    // Verify the answers
    const isValid = securityQuestions.every((providedQuestion) => {
      const correspondingQuestion = storedSecurityQuestions.find(question => question.question === providedQuestion.question);
      return correspondingQuestion && correspondingQuestion.answer === providedQuestion.answer;
    });

    // If the questions are valid and if it is not valid function
    if (isValid) {
      console.log("Security questions match");
      res.status(200).json({ message: "Successfully verified security questions" });
    } else {
      res.status(400).json({ message: "Invalid security answers." });
    }
  } catch (err) {
    console.error("Error:", err);
    next(err);
  }
});

// Reset Password API
router.post("/:email/reset-password", async (req, res) => {
  try {

    // Const gets req.params/body
    const { password } = req.body;
    const { email } = req.params;

    // A password is required and must be entered
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Const gets a limitation assigned to it
    const user = await User.findOne({ email });

    // If user is not found error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Give const a value
    const hashedPassword = bcrypt.hashSync(password, 10);

    user.password = hashedPassword;
    const updatedUser = await user.save();

    // Message sent for successful change or a 500 error message
    res.status(200).json({ message: "Password reset successful", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
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