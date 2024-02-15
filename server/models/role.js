const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create role schema
const roleSchema = new Schema({
  text: { type: String, unique: true },
  isDisabled: { type: Boolean, default: false },
});

// Export role schema
module.exports = mongoose.model("Role", roleSchema);