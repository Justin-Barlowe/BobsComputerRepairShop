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
const YAML = require("yamljs");
const cors = require("cors");

// Import API routes
const UserAPI = require("./routes/usersApi");
const SigninAPI = require("./routes/signinApi");
const SecurityAPI = require("./routes/securityApi")
const securityQuestions = require("./utils/securityQuestions");
const InvoiceAPI = require("./routes/invoiceApi");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// import MongoDB database connection string from config.json
const config = require("./utils/config.js");

// Express variable.
const app = express();

// Swagger Imports
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../dist/bcrs")));
app.use("/",
  express.static(path.join(__dirname, "../dist/bcrs"))
);
app.use('/uploads', express.static('uploads'));

// Use CORS to allow all origins.
app.use(cors());


// Set port to environment variable or 3000
const PORT = process.env.PORT || 3000;

// Connect to database
const CONN = config.dbConn;

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
  apis: ["routes/*.js", path.join(__dirname, "./api/*.yaml")],

};

// Security Questions
app.get("/api/security-questions", (req, res) => {
  res.json(securityQuestions);
});

// Open API specification
const openapiSpecification = swaggerJsdoc(swaggerOptions);

// Connect SwaggerUI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use("/api/users", UserAPI);
app.use("/api/signin", SigninAPI);
app.use("/api/security", SecurityAPI);
app.use("/api/invoice", InvoiceAPI);

// Connect to Database
mongoose.connect(CONN).then(
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

// Connect to express server
app.listen(PORT, () => {
  console.log("Application started and listening on PORT: " + PORT);
});

// Export app
module.exports = app;