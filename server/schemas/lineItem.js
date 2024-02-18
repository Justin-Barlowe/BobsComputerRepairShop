/**
 * Title: lineItem.js
 * Author: Justin Barlowe
 * Date: 02/14/2024
 */

// imports statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// the schema for lineItemSchema
const lineItemSchema = new Schema({
  title: { type: String },
  price: { type: Number }
});

// exports the lineItemSchema
module.exports = lineItemSchema;