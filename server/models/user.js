/**
 * Title: user.js
 * Author: Justin Barlowe, John Davidson, Nolan Berryhill
 * Date: 02/14/2024
 */

// imports statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// // Import userRole schema and securityQuestion schema
// const securityQuestion = require("../schemas/securityQuestion");

// // Create user model
// const userSchema = new Schema(
//   {
//     userName: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     firstName: { type: String },
//     lastName: { type: String },
//     phoneNumber: { type: String },
//     address: { type: String },
//     email: { type: String },
//     isDisabled: { type: Boolean, default: false },
//     role: { type: String },
//     securityQuestion: [securityQuestion],
//     dateCreated: { type: Date, default: new Date() },
//     dateModified: { type: Date },
//   },
//   { collection: "users" }
// );

// // Export user schema
// module.exports = mongoose.model("User", userSchema);

// Define the securityQuestion schema
const securityQuestionSchema = new Schema(
  {
  question: { type: String, required: true },
  answer: { type: String, required: true }
  },
  { _id: false }
  );

// Create the user schema
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
    role: { type: String },
    securityQuestions: [securityQuestionSchema], // Embed securityQuestion schema directly
    dateCreated: { type: Date, default: new Date() },
    dateModified: { type: Date },
  },
  { collection: "users" }
);

// Export user schema
module.exports = mongoose.model("User", userSchema);