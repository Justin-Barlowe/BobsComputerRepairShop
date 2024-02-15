const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userRoleSchema = new Schema({
  text: { type: String, default: "standard" }
});

// export userRoleSchema
module.exports = userRoleSchema;