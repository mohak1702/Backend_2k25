import Gallery from "../models/Gallery.js";

// GET all gallery items
export const getGallery = async (req, res) => {
  const gallery = await Gallery.find();
  res.json(gallery);
};

// GET single gallery item
export const getGalleryItem = async (req, res) => {
  const item = await Gallery.findById(req.params.id);
  res.json(item);
};

// POST create new gallery item
// export const createGalleryItem = async (req, res) => {
//   try {
//     const newItem = new Gallery(req.body);
//     await newItem.save();
//     res.status(201).json(newItem);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
export const createGalleryItem = async (req, res) => {
  try {
    const galleryData = { ...req.body };

    if (req.file) {
      galleryData.image = req.file.path; // Cloudinary URL
    }

    const newItem = new Gallery(galleryData);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update gallery item
// export const updateGalleryItem = async (req, res) => {
//   try {
//     const updatedItem = await Gallery.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updatedItem);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
export const updateGalleryItem = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.path; // Replace with new Cloudinary image
    }

    const updated = await Gallery.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: "Gallery item not found" });

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE gallery item
export const deleteGalleryItem = async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ message: "Gallery item deleted successfully" });
};

// POST like gallery item
export const likeGalleryItem = async (req, res) => {
  const item = await Gallery.findById(req.params.id);
  item.likes += 1;
  await item.save();
  res.json({ likes: item.likes });
};
