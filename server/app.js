/**
 * Title: app.js
 * Author: Nolan Berryhill, Justin Barlowe, John Davidson
 * Date: 02/17/2024
 */

// Use strict
"use strict";

// imports statements
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

// Swagger Imports
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Import API routes
const UserAPI = require("./routes/usersApi");
const SigninAPI = require("./routes/signinApi");
const SecurityAPI = require("./routes/securityApi");
const InvoiceAPI = require("./routes/invoiceApi");
const securityQuestions = require("./utils/securityQuestions");

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });

// Import MongoDB database connection string from config.json
const config = require("./utils/config.js");

// Express variable.
const app = express();

// Use CORS to allow all origins. This should be one of the first middlewares you use.
app.use(cors());

// Express middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Swagger Options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WEB450 Bob's Computer Repair Shop",
      version: "1.0.0",
    },
  },
  // Path to the API docs
  apis: ["./routes/*.js"], // Ensure this path is correct for your project structure.
};

// Open API specification
const openapiSpecification = swaggerJsdoc(swaggerOptions);

// Connect SwaggerUI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// API routes
app.use("/api/users", UserAPI);
app.use("/api/signin", SigninAPI);
app.use("/api/security", SecurityAPI);
app.use("/api/invoice", InvoiceAPI);

// Route for security questions
app.get("/api/security-questions", (req, res) => {
  res.json(securityQuestions);
});

// Serve static files from the Angular app build directory
app.use(express.static(path.join(__dirname, "../dist/bcrs")));

// Catch-all route to serve the Angular app index.html for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/bcrs/index.html'));
});

// Connect to Database
mongoose.connect(config.dbConn).then(
  () => {
    console.log("Connection to the database was successful");
  },
  (err) => {
    console.log("MongoDB Error: " + err.message);
  }
);

mongoose.connection.on("error", (err) => {
  console.log(config.mongoServerError + ": " + err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Server disconnected from host (MongoDB Atlas).");
});

// Set port to environment variable or 3000
const PORT = process.env.PORT || 3000;

// Connect to express server
app.listen(PORT, () => {
  console.log("Application started and listening on PORT: " + PORT);
});

// Export app for potential testing or modular use
module.exports = app;
