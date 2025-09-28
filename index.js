import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Routes
import eventRoutes from "./routes/events.js";
import galleryRoutes from "./routes/gallery.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect DB
connectDB();

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/gallery", galleryRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
