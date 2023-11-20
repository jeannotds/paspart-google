const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      min: 3,
      max: 20,
    },
    name: {
      type: String,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      max: 50,
    },
    password: {
      type: String,
      min: 8,
    },
    googleId: {
      type: String,
      required: true,
      min: 8,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
