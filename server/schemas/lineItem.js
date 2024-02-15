const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lineItemSchema = new Schema({
  title: { type: String },
  price: { type: Number }
});

// exports the lineItemSchema
module.exports = lineItemSchema;