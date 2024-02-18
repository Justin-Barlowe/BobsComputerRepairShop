/**
 * Title: userRole.js
 * Author: Justin Barlowe
 * Date: 02/14/2024
 */

// imports statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// the schema for userRoleSchema
const userRoleSchema = new Schema({
  text: { type: String, default: "standard" }
});

// export userRoleSchema
module.exports = userRoleSchema;