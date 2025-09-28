import express from "express";
import upload from "../config/multer.js";
import {
  getGallery,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  likeGalleryItem,
} from "../controllers/galleryController.js";

const router = express.Router();

router.get("/", getGallery);
router.get("/:id", getGalleryItem);
router.post("/", upload.single("image"), createGalleryItem);
router.put("/:id", upload.single("image"), updateGalleryItem);
router.delete("/:id", deleteGalleryItem);
router.post("/:id/like", likeGalleryItem);

export default router;
