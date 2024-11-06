const mongoose = require("mongoose");

const resetKey = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ResetKey", resetKey);
