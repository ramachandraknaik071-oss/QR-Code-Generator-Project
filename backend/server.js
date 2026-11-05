// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const qrRoutes = require("./routes/qr");

const app = express();
const PORT = 5000;

/* 
   Middleware
 */
app.use(cors());
app.use(express.json());

/* 
   Route Connections
 */
app.use("/auth", authRoutes);
app.use("/qr", qrRoutes);

/* 
   MongoDB Connection
*/
mongoose.connect("mongodb://127.0.0.1:27017/qrcodeDB")
  .then(() => {
    console.log(" MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log(" MongoDB Connection Error:", err);
  });

/* 
   Home Route
 */
app.get("/", (req, res) => {
  res.send("Backend is working successfully");
});

/* 
   Start Server
 */
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});