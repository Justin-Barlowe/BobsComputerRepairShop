// Name: Justin Barlowe, Nolan Berryhill
// Date: 02/19/2024
// File: server/routes/securityApi.js
// Purpose: This file contains the security API routes, Register, verifyUser, verifySecurityQuestion, and resetPassword.

// imports statements
const express = require("express");
const User = require("../models/user");
const router = express.Router();

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

// Export router
module.exports = router;