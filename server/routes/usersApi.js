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

// Find all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users) {
      const err = new Error("No users found.");
      err.status = 404;
      console.log("err", err);
      next(err);
      return;
    }
    res.status(200).send(users);
  } catch (err) {
    console.error("err", err);
    next(err);
  }
});

// findById
router.get("/:id", async (req, res, next) => {
  try {
    let userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).send({ message: "Invalid user ID format" });
    }
    console.error("err", err);
    next(err);
  }
});

// Create a new user
router.post("/", async (req, res, next) => {
  const { userName, password, email } = req.body;

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

// Export the router
module.exports = router;
