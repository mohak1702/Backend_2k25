import Event from "../models/Event.js";
import Booking from "../models/Booking.js";

// GET all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single event
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create event (Admin)
// export const createEvent = async (req, res) => {
//   try {
//     console.log("REQ BODY:", req.body); // debug
//     const event = new Event(req.body);
//     await event.save();
//     res.status(201).json(event);
//   } catch (error) {
//     console.error("CREATE EVENT ERROR:", error);
//     res.status(400).json({ message: error.message });
//   }
// };
export const createEvent = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);

    const eventData = { ...req.body };

    // Cloudinary upload: multer-storage-cloudinary already sets req.file.path
    if (req.file) {
      eventData.image = req.file.path;
    }

    const event = new Event(eventData);
    await event.save();

    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};




// PUT update event (Admin)
export const updateEvent = async (req, res) => {
  try {
    const eventData = { ...req.body };

    // If a new image is uploaded, update the 'image' field
    if (req.file) {
      eventData.image = req.file.path; // Cloudinary URL from multer-storage-cloudinary
    }

    // Convert activities string to array if needed
    if (eventData.activities && typeof eventData.activities === "string") {
      eventData.activities = eventData.activities
        .split(",")
        .map((a) => a.trim());
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      eventData,
      { new: true, runValidators: true } // runValidators ensures required fields are checked
    );

    if (!updatedEvent)
      return res.status(404).json({ message: "Event not found" });

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("UPDATE EVENT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
// DELETE event (Admin)
export const deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST book an event
export const bookEvent = async (req, res) => {
  try {
    const booking = new Booking({
      event: req.params.id,
      ...req.body
    });
    await booking.save();
    res.status(201).json({ bookingId: booking._id, message: "Booking confirmed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
