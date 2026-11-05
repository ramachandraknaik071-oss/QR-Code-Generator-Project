// backend/routes/qr.js

const express = require("express");
const QRCode = require("qrcode");
const QrCode = require("../models/QrCode");

const router = express.Router();

/* =========================
   Generate QR + Save in MongoDB
========================= */
router.get("/generate", async (req, res) => {
  const { text, userId } = req.query;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Generate QR Code
    const qr = await QRCode.toDataURL(text);

    // Save in MongoDB
    const savedQR = await QrCode.create({
      userId,
      text,
      imageUrl: qr
    });

    res.json({
      success: true,
      qr,
      savedQR
    });

  } catch (error) {
    console.log("QR Generate Error:", error);
    res.status(500).json({
      success: false,
      error: "QR generation failed"
    });
  }
});

/* =========================
   Get User-wise QR History
========================= */
router.get("/all/:userId", async (req, res) => {
  try {
    const data = await QrCode.find({
      userId: req.params.userId
    }).sort({ _id: -1 });

    res.json(data);

  } catch (error) {
    console.log("Fetch History Error:", error);
    res.status(500).json({
      error: "Failed to fetch history"
    });
  }
});

/* =========================
   Delete QR by ID
========================= */
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await QrCode.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "QR not found"
      });
    }

    res.json({
      success: true,
      message: "QR deleted successfully"
    });

  } catch (error) {
    console.log("Delete Error:", error);

    res.status(500).json({
      success: false,
      error: "Delete failed"
    });
  }
});

module.exports = router;