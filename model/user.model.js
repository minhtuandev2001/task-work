const mongoose = require("mongoose")
const generate = require("../utils/generate")

const userSchema = mongoose.Schema({
  fullName: { type: String },
  email: { type: String },
  password: { type: String },
  token: {
    type: String,
    default: generate.generateRandomString(20)
  },
  status: { type: String, default: "active" },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date }
}, {
  timestamps: true,
})

const User = mongoose.model("User", userSchema)
module.exports = User