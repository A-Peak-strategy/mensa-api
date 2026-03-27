import express from "express";
import quoteController from "../controllers/quote.controller.js";

const router = express.Router();

// Public route - create quote
router.post("/create", quoteController.create);

// Admin routes
router.get("/", quoteController.getAll);
router.get("/stats", quoteController.getStats);
router.get("/:id", quoteController.getById);
router.put("/update/:id", quoteController.update);
router.delete("/delete/:id", quoteController.delete);

export default router;
