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