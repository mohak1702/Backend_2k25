import express from "express";
import upload from "../config/multer.js";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  bookEvent
} from "../controllers/eventsController.js";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/",upload.single("image"), createEvent);
router.put("/:id", upload.single("image"), updateEvent);
router.delete("/:id", deleteEvent);
router.post("/:id/book", bookEvent);

//upload single image for event


export default router;


