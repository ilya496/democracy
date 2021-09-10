const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  money: { type: Number, default: 0 },
  roles: [{ type: String, ref: "Role" }],
  isOnline: { type: Boolean, default: false },
});

module.exports = model("User", userSchema);
