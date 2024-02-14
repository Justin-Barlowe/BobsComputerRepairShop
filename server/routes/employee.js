/**
====================================================
; Title:  employee.js
; Author: Nolan Berryhill
; Date:   2/13/2024
; Description: To operation the APIs through swagger and mongo
;===================================================
*/

// Make strict
"use strict";

// Import necessary dependencies
const { mongo } = require("../utils/mongo");

// Define schema for selected security questions
const SelectedSecurityQuestionSchema = new mongo.Schema({
  questionText: { type: String, required: true },
  answerText: { type: String, required: true }
});

// Define schema for line items in an invoice
const LineItemSchema = new mongo.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true}
});

// Define schema for User collection
const UserSchema = new mongo.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String },
  address: { type: String },
  isDisabled: { type: Boolean, default: false },
  role: { type: String },
  selectedSecurityQuestions: [SelectedSecurityQuestionSchema]
});

// Define schema for Invoice collection
const InvoiceSchema = new mongo.Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  lineItems: [LineItemSchema],
  partsAmount: { type: Number, required: true },
  laborAmount: { type: Number, required: true },
  lineItemTotal: { type: Number, required: true },
  invoiceTotal: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now }
});

// Create mongo models for User and Invoice
const User = mongo.model('User', UserSchema);
const Invoice = mongo.model('Invoice', InvoiceSchema);

// Export the models
module.exports = { User, Invoice };