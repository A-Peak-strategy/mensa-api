import express from "express";
import eventController from "../controllers/event.controller.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  uploadMiddleware.single("image"),
  eventController.create
);

router.get("/", eventController.getAll);

router.get("/:id", eventController.getById);

router.put(
  "/update/:id",
  uploadMiddleware.single("image"),
  eventController.update
);

router.delete("/delete/:id", eventController.deleteById);

export default router;
