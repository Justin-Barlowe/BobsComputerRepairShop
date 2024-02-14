/**
 * Title: app.js
 * Author: Nolan Berryhill
 * Date: 02/13/2024
 */

'use strict'

// Require statements
const express = require('express')
const createServer = require('http-errors')
const path = require('path')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require(swagger-ui-express) // Import swaggerUi
const createUsers = require('./users')
const employeeRoute = require("./routes/employee"); // Import employee.js file

createUsers()

// Create the Express app
const app = express()

// Title and version for API
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bob Computer Repair Shop",
      version: "1.0.0",
    },
  },
  apis: ['server/routes/*.js'],
};

const openapiSpecification = swaggerJsDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Configure the app
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../dist/bcrs')))
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')))

app.use("/api/employees", employeeRoute); // Use employee routes

// error handler for 404 errors
app.use(function(req, res, next) {
  next(createServer(404)) // forward to error handler
})

// error handler for all other errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500) // set response status code

  // send response to client in JSON format with a message and stack trace
  res.json({
    type: 'error',
    status: err.status,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  })
})

module.exports = app // export the Express application