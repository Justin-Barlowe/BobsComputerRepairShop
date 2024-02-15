/**
 * Title: role.js
 * Author: Justin Barlowe, John Davidson, Nolan Berryhill
 * Date: 02/14/2024
 */

// imports statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create role schema
const roleSchema = new Schema({
  text: { type: String, unique: true },
  isDisabled: { type: Boolean, default: false },
});

// Export role schema
module.exports = mongoose.model("Role", roleSchema);