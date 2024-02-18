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
  questionText: { type: String },
  answerText: { type: String },
});

// export selectedSecurityQuestionSchema
module.exports = selectedSecurityQuestionSchema;