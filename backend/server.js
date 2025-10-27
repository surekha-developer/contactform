import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();
// const cors = require("cors");
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)

  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error: ", err));

  app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
  })
);
//test route
app.get("/", (req, res) => {
  res.send("🚀 Backend is working properly!");
});

// Routes
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// app.use(
//   cors({
//     origin: "http://localhost:5173", // frontend URL
//   })
// );
