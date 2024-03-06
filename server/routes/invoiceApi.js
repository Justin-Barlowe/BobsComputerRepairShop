// Name: Justin Barlowe, Nolan Berryhill, John Davidson
// Date: 02/26/2024
// File: invoiceApi.js
// Purpose: This file contains the invoice API routes, getInvoices, getInvoice, addInvoice, updateInvoice, and deleteInvoice.

// imports statements
const express = require("express");
const router = express.Router();
const Invoice = require("../models/invoice");

// Create Invoice
router.post("/:userName", async (req, res) => {
  const { userName } = req.params;

  // Check if userName is provided
  if (!userName) {
    return res.status(400).json({
      status: "400",
      message: "Bad Request: userName is required"
    });
  }

  // Create a new invoice object
  const newInvoice = {
    userName,
    lineItems: req.body.lineItems,
    partsAmount: req.body.partsAmount,
    laborAmount: req.body.laborAmount,
    lineItemTotal: req.body.lineItemTotal,
    total: req.body.total,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  };

  try {
    // Log the new invoice object
    console.log(newInvoice);

    // Create and log the invoice
    const invoice = await Invoice.create(newInvoice);
    console.log(invoice);

    res.status(200).json({
      status: "200",
      message: "Query successful",
      data: invoice
    });

  } catch (e) { // Catch any error during invoice creation or logging
    console.error(e); // Use console.error for errors
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
      error: e.message
    });
  }
});


// findPurchasesByService
router.get('/', async (req, res) => {
  try {
    // Define aggregation pipeline to find purchases by service
    const aggregationPipeline = [
      { $unwind: '$lineItems' }, // Deconstruct the lineItems array
      { $group: {
          _id: '$lineItems.title', // Group by lineItem titles
          count: { $sum: 1 } // Count occurrences of each title
        }
      },
      { $sort: { _id: 1 } } // Sort by title in ascending order
    ];

    // Execute aggregation pipeline on the Invoice collection
    const result = await Invoice.aggregate(aggregationPipeline);

    // Respond with aggregated data
    res.status(200).json({ data: result });

  } catch (err) {
    console.error('Error:', err); // Log any erros that occur
    res.status(500).json({ error: err.message }); // Respond with error status and message
  }
});

// Get All Invoices
router.get("/all", async (req, res) => {
  try {
    const invoices = await Invoice.find({});
    res.status(200).json({
      status: "200",
      message: "Query successful",
      data: invoices
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
      error: e.message
    });
  }
});

// Update invoices
router.put("/:invoiceId", async (req, res) => {
  const { invoiceId } = req.params;
  const { status, payStatus } = req.body;

  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      invoiceId,
      { $set: { status: status, payStatus: payStatus } },
      { new: true }
    );

    res.status(200).json({
      status: "200",
      message: "Invoice status updated successfully",
      data: updatedInvoice
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
      error: e.message
    });
  }
});

// Search for Invoices by First Name and Last Name
router.get("/search", async (req, res) => {
  const { firstName, lastName } = req.query;

  // Check if both firstName and lastName are provided
  if (!firstName || !lastName) {
    return res.status(400).json({
      status: "400",
      message: "Both firstName and lastName are required"
    });
  }

  try {
    // Use the find method to search for invoices with the given firstName and lastName
    const invoices = await Invoice.find({ firstName: firstName, lastName: lastName });

    // Check if any invoices are found
    if (!invoices.length) {
      return res.status(404).json({
        status: "404",
        message: "No invoices found with the provided firstName and lastName"
      });
    }

    // Return the found invoices
    res.status(200).json({
      status: "200",
      message: "Query successful",
      data: invoices
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "500",
      message: "Internal Server Error",
      error: e.message
    });
  }
});


module.exports = router;