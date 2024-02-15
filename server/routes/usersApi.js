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
  try {
    // Hash the password
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    // Create a new user object
    const user = new User({
      userName: req.body.userName,
      password: hashedPassword,
      email: req.body.email,
    });

    const savedUser = await user.save();

    res.status(201).send(savedUser);
  } catch (err) {
    console.error("err", err);
    next(err);
  }
});// deleteUser
router.delete('/api/users/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;

    // Check if the userId is provided
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    mongo(async db => {
        // Check if the user exists
        const user = await db.collection('users').findByIdandUpdate(
          userId,
          // Soft delete the user by setting isDisabled to true
          { $set: { isDisabled: true } },
          { new: true }
        );

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

      // Send response with status 204 - No Content
      res.status(204).send();
    }, next);
  } catch (error) {
    // Handle internal server errors
    console.error('Error deleting user:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Signin
router.post('/api/security/signin', async (req, res, next) => {
  try{
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Use the mongo function to interact with MongoDB
    mongo(async db => {
      // Check if the user exists in the database
      const user = await db.collection('users').findOne({ username, password });

      if (!user) {
        // If user is not found, return 404 Not Found
        return res.status(404).json({ message: "User not found" });
      }

      // If user is found, return 200 OK with user data
      res.status(200).json({ message: "Signin successful", user });
    }, next);
  } catch (error) {
    // Handle errors
    console.error('Error signing in:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Export the router
module.exports = router;
