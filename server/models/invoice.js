/**
 * Title: invoice.js
 * Author: Justin Barlowe, John Davidson, Nolan Berryhill
 * Date: 02/14/2024
 */

// imports statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Import line item schema
const lineItemDocument = require("../schemas/lineItem");

// Create model
const invoiceSchema = new Schema({
  userName: { type: String },
  lineItems: [lineItemDocument],
  partsAmount: { type: Number },
  laborAmount: { type: Number },
  lineItemTotal: { type: Number },
  total: { type: Number },
  orderDate: { type: Date, default: new Date() },
});

// Export Schema
module.exports = mongoose.model("Invoice", invoiceSchema);