const mongoose = require("mongoose");

const VareSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    weight: { type: Number },
    date: { type: String, required: true },
    fridgeNumber: { type: Number, required: true },
    comment: { type: String  }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vare", VareSchema);
