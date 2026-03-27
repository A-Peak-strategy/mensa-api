import * as galleryService from "../services/gallery.service.js";
import { uploadImages, deleteProductImage } from "../services/imageUpload.service.js";

const galleryController = {
    async create(req, res) {
        try {
            const data = { ...req.body };
            if (req.file) {
                const uploaded = await uploadImages(req.file);
                data.image = { url: uploaded.url, public_id: uploaded.public_id };
            }
            if (!data.image) {
                return res.status(400).json({ status: false, error: "Image is required." });
            }
            const gallery = await galleryService.createGalleryImage(data);
            res.status(200).json({ status: true, data: gallery, message: "Gallery image added successfully." });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    },

    async getAll(req, res) {
        try {
            const activeOnly = req.query.active === "true";
            const images = await galleryService.getAllGalleryImages(activeOnly);
            res.status(200).json({ status: true, data: images });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    },

    async getById(req, res) {
        try {
            const image = await galleryService.getGalleryImageById(req.params.id);
            res.status(200).json({ status: true, data: image });
        } catch (error) {
            res.status(404).json({ status: false, error: error.message });
        }
    },

    async update(req, res) {
        try {
            const updateData = { ...req.body };
            if (req.file) {
                const uploaded = await uploadImages(req.file);
                updateData.image = { url: uploaded.url, public_id: uploaded.public_id };
            }
            const updated = await galleryService.updateGalleryImage(req.params.id, updateData);
            res.status(200).json({ status: true, data: updated, message: "Gallery image updated successfully." });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    },

    async deleteById(req, res) {
        try {
            // Get the image first to delete from Cloudinary
            const image = await galleryService.getGalleryImageById(req.params.id);
            if (image.image?.public_id) {
                try {
                    await deleteProductImage(image.image.public_id);
                } catch (e) {
                    console.warn("Failed to delete image from Cloudinary:", e.message);
                }
            }
            await galleryService.deleteGalleryImage(req.params.id);
            res.status(200).json({ status: true, message: "Gallery image deleted successfully." });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    },

    async reorder(req, res) {
        try {
            const { orderedIds } = req.body;
            if (!Array.isArray(orderedIds)) {
                return res.status(400).json({ status: false, error: "orderedIds must be an array." });
            }
            await galleryService.reorderGalleryImages(orderedIds);
            res.status(200).json({ status: true, message: "Gallery reordered successfully." });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    },
};

export default galleryController;
