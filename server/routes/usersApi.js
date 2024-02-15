/**
 * Title: usersApi.js
 * Author: Justin Barlowe, John Davidson, Nolan Berryhill
 * Date: 02/14/2024
 */

// imports statements
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Find all users
router.get('/', async (req, res, next) => {
  try {
      // Find all users in the collection.
      const users = await User.find();

      // If no users are found, generate a 404 error response.
      if(!users) {
        const err = new Error('No users found.');
        err.status = 404;
        console.log('err', err);
        next(err);
        return;
      }
      // Respond with status 200 and send the user record as a JSON response object.
      res.status(200).send(users)
    }
  catch (err) {
    // Handle any unexpected errors by logging them and passing them to the next middleware.
    console.error('err', err);
    next(err);
  }
})

// findById
router.get('/users/:id',  async (req, res, next) => {
  try {
    let userId = req.params.userId;

    if (!userId) {
      const err = new Error('The userId you entered does not exist.');
      err.status = 400;
      console.log('err', err);
      next(err);
      return;
    }

    mongo(async db => {
      const user = await db.collection('users').findOne(userId);

      res.status(200).send(user)
    })

  } catch (err) {
    console.error('err', err);
    next(err);
  }
})

// deleteUser
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