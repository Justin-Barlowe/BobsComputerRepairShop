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



// Export the router
module.exports = router;