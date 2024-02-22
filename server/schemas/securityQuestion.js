/**
 * Title: securityQuestion.js
 * Author: Justin Barlowe
 * Date: 02/14/2024
 */

// imports statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// the schema for selectedSecurityQuestionSchema
const selectedSecurityQuestionSchema = new Schema({
  securityQuestion1: { type: String },
  securityAnswer1: { type: String },
  securityQuestion2: { type: String },
  securityAnswer2: { type: String },
  securityQuestion3: { type: String },
  securityAnswer3: { type: String }
});

// export selectedSecurityQuestionSchema
module.exports = selectedSecurityQuestionSchema;