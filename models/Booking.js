import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  name: { type: String, required: true },
  email: String,
  phone: String,
  participants: { type: Number, required: true },
  bookedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", bookingSchema);
