/**
====================================================
; Title:  users.js
; Author: Nolan Berryhill
; Date:   2/13/2024
; Description: To operation the APIs through swagger and mongo
;===================================================
*/

// Make strict
"use strict";

const express = require("express");
const router = express.Router();
const { mongo } = require("../utils/mongo");

// Import the User model from employee.js
const { User } = require('./employee');

// Function to create new users
async function createUsers() {
  try {
    // Create user 1
    const user1 = new User({
      email: 'bach@nodebucket.com',
      password: 'Password01',
      firstName: 'Johann',
      lastName: 'Bach',
      role: 'standard'
    });

    // Save user 1 to the database
    await user1.save();
    console.log('User 1 created successfully.');

    // Create user 2
     const user2 = new User({
      email: 'mozart@nodebucket.com',
      password: 'Password01',
      firstName: 'Wolfgang Amadeus',
      lastName: 'Mozart',
      role: 'admin'
     });

     // Save user 2 to the database
     await user2.save();
     console.log('User 2 created successfully.');
  } catch (error) {
    console.error('Error creating users:', error);
  }
}


// findAllUsers ** By John Davidson
router.get('/users', (req, res, next) => {
  try {
    mongo(async db => {
      // Find all users in the collection.
      const users = await db.collection('users').find();

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
    })
  } catch (err) {
    // Handle any unexpected errors by logging them and passing them to the next middleware.
    console.error('err', err);
    next(err);
  }
})

// Export the function to create users
module.exports = createUsers;