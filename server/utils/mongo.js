/**
====================================================
; Title:  mongo.js
; Author: Nolan Berryhill
; Date:   1/22/2024
; Description: Javascript to merge mongo database
;===================================================
*/

// Make strict
"use strict";

// Valuable is MongoClient
const { MongoClient } = require("mongodb");
const config = require('./config');

// Link to mongodb
const MONGO_URL = config.dbUrl;

// Allows for code to link up with mongo database
const mongo = async(operations, next) => {
  try {
    console.log("Connecting to db...");

    const client = await MongoClient.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db(config.dbname);
    console.log("Connected to db.");

    await operations(db);
    console.log("Operations was successful.");

    client.close();
    console.log("Connection to db closed.")

  } catch (err) {
    const error = new Error("Error connecting to db: ", err);
    error.status = 500;

    console.log("Error connecting to db: ", err);
    next(error);
  }
};

// Exports Mongo
module.exports = { mongo };