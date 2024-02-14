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

// Export the function to create users
module.exports = createUsers;