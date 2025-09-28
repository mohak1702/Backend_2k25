import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: String,
  date: String,
  time: String,
  monastery: String,
  description: String,
  image: String,
  participants: String,
  duration: String,
  significance: String,
  activities: [String],
  bookingRequired: Boolean,
  featured: Boolean
});

export default mongoose.model("Event", eventSchema);
