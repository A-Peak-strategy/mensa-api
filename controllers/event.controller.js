import * as eventService from "../services/event.service.js";
import { uploadImages } from "../services/imageUpload.service.js";

const eventController = {
  async create(req, res) {
    try {
      const data = { ...req.body };
      if (req.file) {
        const uploaded = await uploadImages(req.file);
        data.image = { url: uploaded.url, public_id: uploaded.public_id };
      }
      const event = await eventService.createEvent(data);
      res.status(200).json({ status: true, data: event, message: "Event created successfully." });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const events = await eventService.getAllEvents();
      res.status(200).json({ status: true, data: events });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const event = await eventService.getEventById(req.params.id);
      res.status(200).json({ status: true, data: event });
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
      const updated = await eventService.updateEvent(req.params.id, updateData);
      res.status(200).json({ status: true, data: updated, message: "Event updated successfully." });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  },

  async deleteById(req, res) {
    try {
      await eventService.deleteEvent(req.params.id);
      res.status(200).json({ status: true, message: "Event deleted successfully." });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  },
};

export default eventController;
