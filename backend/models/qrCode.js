// backend/models/QrCode.js

const mongoose = require("mongoose");

const qrCodeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },

  text: {
    type: String,
    required: true
  },

  imageUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("QrCode", qrCodeSchema);





