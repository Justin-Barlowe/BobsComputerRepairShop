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

  // Check if userName is provided
  if (!req.params.userName) {
    return res.status(400).json({
      status: "400",
      message: "Bad Request: userName is required"
    });
  }

  // Create a new invoice object
  try {
    const newInvoice = {
      userName: req.params.userName,
      lineItems: req.body.lineItems,
      partsAmount: req.body.partsAmount,
      priceAmount: req.body.priceAmount,
      laborAmount: req.body.laborAmount,
      lineItemTotal: req.body.lineItemTotal,
      total: req.body.total,
    };

    // Log the new invoice object
    console.log(newInvoice);
    Invoice.create(newInvoice)
      .then(invoice => {
        // If there is no error, log the invoice and return a 200 status code
        if (!invoice) {
          return res.status(404).json({
            status: "404",
            message: "Not Found: Invoice could not be created"
          });
        }
        console.log(invoice);
        res.status(200).json({
          status: "200",
          message: "Query successful",
          data: invoice
        });
      })
      .catch(err => {
        // If there is an error, log the error and return a 500 status code
        console.log(err);
        res.status(500).json({
          status: "500",
          message: "Internal Server Error",
          error: err
        });
      });
  } catch (e) { // If there is an error, log the error and return a 500 status code
    console.log(e);
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
    const aggregationPipeline = [
      { $unwind: '$lineItems' }, // Deconstruct the lineItems array
      { $group: {
          _id: '$lineItems.title', // Group by lineItem titles
          count: { $sum: 1 } // Count occurrences of each title
        }
      },
      { $sort: { _id: 1 } } // Sort by title in ascending order
    ];

    const result = await Invoice.aggregate(aggregationPipeline);

    res.status(200).json({ data: result });

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;