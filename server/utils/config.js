/**
====================================================
; Title:  config.js
; Author: Nolan Berryhill
; Date:   2/13/2024
; Description: Code to link up with Mongo
;===================================================
*/

// Make strict
"use strict";

// Gives value to db._words
const db = {
  username: "bcrsDB_user",
  password: "s3crets",
  name: "bcrsDB"
};

// Gives value to config._words
const config = {
  port: 4200,
  dbUrl: `mongodb+srv://${db.username}:${db.password}@cluster0.wmphxtw.mongodb.net/${db.name}?retryWrites=true&w=majority`,
  dbname: db.name
};

// Export config
module.exports = config;