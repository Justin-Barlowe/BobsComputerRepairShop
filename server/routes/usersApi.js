/**
 * Title: usersApi.js
 * Author: Justin Barlowe, John Davidson, Nolan Berryhill
 * Date: 02/14/2024
 */

// imports statements
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");

const router = express.Router();

// FindAllUsers
router.get("/", async (req, res, next) => {
  try {
    // Find all users in the collection.
    const users = await User.find();

    // If no users are found, generate a 404 error response.
    if (!users) {
      const err = new Error("No users found.");
      err.status = 404;
      console.log("err", err);
      next(err);
      return;
    }
    // Respond with status 200 and send the user record as a JSON response object.
    res.status(200).send(users);
  } catch (err) {
    // Handle any unexpected errors by logging them and passing them to the next middleware.
    console.error("err", err);
    next(err);
  }
});

 // findById
 router.get('/:id',  async (req, res, next) => {
  try {
    // Extract the user ID from the request parameters
    let userId = req.params.id;

    // If userId is falsy, generate a 400 error response.
    if (!userId) {
      const err = new Error('The userId you entered does not exist.');
      err.status = 400;
      console.log('err', err);
      next(err);
      return;
    }

    // Find the user by their ID in the User collection.
    const findById = await User.findOne({_id: userId});

    // If user is not found, return a 404 error.
    if(!findById) {
      const err = new Error('User not found.');
      err.status = 404;
      console.log('err', err);
      next(err);
      return;
    }

    // Send the user data in a response.
    res.status(200).send(findById)

  } catch (err) {
    // Handle unexpected errors by logging them and passing them to the next middleware.
    console.error('err', err);
    next(err);
  }
})

// Create a new user
router.post("/", async (req, res, next) => {
  const { userName, password, email, firstName, lastName } = req.body;

  // Check if userName and password are provided
  if (!userName || !password) {
    return res.status(400).json({ error: 'userName and password are required' });
  }

  try {
    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user object
    const user = new User({
      userName,
      password: hashedPassword,
      email,
      firstName,
      lastName,
      role: "user",
    });

    const savedUser = await user.save();

    // Send a response with a confirmation message
    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (err) {
    console.error("err", err);

    // Check if error is a MongoDB duplicate key error
    if (err.code === 11000) {
      return res.status(400).json({ error: 'userName already exists' });
    }

    next(err);
  }
});

// deleteUser
router.delete('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Soft delete the user by setting isDisabled to true
    const updatedUser = await User.findByIdAndUpdate(userId, { isDisabled: true }, { new: true });

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    // Send message that user was deleted.
    res.status(204).send({ message: "User deleted" });
  } catch (err) {
    console.error("Error deleting user:", err);
    next(err); // Pass errors to the error handler
  }
});

// Update a user
router.put('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    // Optional: Hash the new password if it's being changed.
    if(updateData.password) {
      updateData.password = bcrypt.hashSync(updateData.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    next(err); // Pass errors to the error handler
  }
});

// Find Selected Security Questions
router.post("/:email/security-questions", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`User with email ${email} not found.`);
      return res.status(404).json({ status: 404, message: `User with email ${email} not found.` });
    }

    // Extract selected security questions from the user object
    const { securityQuestions } = user;

    // Send the selected security questions as the response
    res.status(200).json({ status: 200, message: "Successfully retrieved selected security questions.", securityQuestions });
  } catch (err) {
    console.error("Internal Server Error:", err);
    return res.status(500).json({ status: 500, message: "Internal Server Error", error: err });
  }
});
module.exports = router;

// Export the router
module.exports = router;
