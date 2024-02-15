/**
 * Title: securityQuestion.js
 * Author: Justin Barlowe, John Davidson, Nolan Berryhill
 * Date: 02/14/2024
 */

// imports statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create securityQuestion schema
const securityQuestionSchema = new Schema(
  {
    text: { type: String },
    isDisabled: { type: Boolean, default: false },
  },
  { collection: "securityQuestions" }
);

// Export securityQuestion schema
module.exports = mongoose.model("SecurityQuestion", securityQuestionSchema);