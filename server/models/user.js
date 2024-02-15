/**
 * Title: user.js
 * Author: Justin Barlowe, John Davidson, Nolan Berryhill
 * Date: 02/14/2024
 */

// imports statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Import userRole schema and securityQuestion schema
const userRoleSchema = require("../schemas/userRole");
const securityQuestion = require("../schemas/securityQuestion");

// Create user model
const userSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    email: { type: String },
    isDisabled: { type: Boolean, default: false },
    role: userRoleSchema,
    securityQuestion: [securityQuestion],
    dateCreated: { type: Date, default: new Date() },
    dateModified: { type: Date },
  },
  { collection: "users" } // pre-build collection in mongodb atlas
);

// Export user schema
module.exports = mongoose.model("User", userSchema);