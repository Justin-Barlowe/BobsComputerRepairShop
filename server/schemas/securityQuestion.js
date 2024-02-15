const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const selectedSecurityQuestionSchema = new Schema({
  questionText: { type: String },
  answerText: { type: String },
});

// export selectedSecurityQuestionSchema
module.exports = selectedSecurityQuestionSchema;