const { Schema, model } = require("mongoose");

const articleSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true, unique: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    published: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Article", articleSchema);
