import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  photographer: String,
  date: String,
  monastery: String,
  category: String,
  tags: [String],
  image: String,
  likes: { type: Number, default: 0 },
  description: String,
  aiGenerated: Boolean,
  location: String,
  equipment: String
});

export default mongoose.model("Gallery", gallerySchema);
