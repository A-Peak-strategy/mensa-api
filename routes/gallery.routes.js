import express from "express";
import galleryController from "../controllers/gallery.controller.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
    "/create",
    uploadMiddleware.single("image"),
    galleryController.create
);

router.get("/", galleryController.getAll);

router.get("/:id", galleryController.getById);

router.put(
    "/update/:id",
    uploadMiddleware.single("image"),
    galleryController.update
);

router.delete("/delete/:id", galleryController.deleteById);

router.post("/reorder", galleryController.reorder);

export default router;
