const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  name: { type: String, default: "user", unique: true },
});

module.exports = model("Role", roleSchema);
