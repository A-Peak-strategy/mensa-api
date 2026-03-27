import express from "express";
import contactController from "../controllers/contact.controller.js";

const router = express.Router();

// Public route - create contact
router.post("/create", contactController.create);

// Admin routes
router.get("/", contactController.getAll);
router.get("/stats", contactController.getStats);
router.get("/:id", contactController.getById);
router.put("/update/:id", contactController.update);
router.put("/read/:id", contactController.markAsRead);
router.delete("/delete/:id", contactController.delete);

export default router;
