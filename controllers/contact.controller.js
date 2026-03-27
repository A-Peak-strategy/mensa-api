import * as contactService from "../services/contact.service.js";

const contactController = {
    async create(req, res) {
        try {
            const { name, email, subject, message } = req.body;
            if (!name || !email || !subject || !message) {
                return res.status(400).json({ status: false, error: "All fields are required." });
            }
            const contact = await contactService.createContact({
                name,
                email,
                subject,
                message,
            });
            res.status(201).json({ status: true, data: contact, message: "Message sent successfully." });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    },

    async getAll(req, res) {
        try {
            const { status } = req.query;
            const contacts = await contactService.getAllContacts(status || null);
            res.status(200).json({ status: true, data: contacts });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    },

    async getById(req, res) {
        try {
            const contact = await contactService.getContactById(req.params.id);
            res.status(200).json({ status: true, data: contact });
        } catch (error) {
            res.status(404).json({ status: false, error: error.message });
        }
    },

    async update(req, res) {
        try {
            const updated = await contactService.updateContact(req.params.id, req.body);
            res.status(200).json({ status: true, data: updated, message: "Contact updated successfully." });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    },

    async delete(req, res) {
        try {
            await contactService.deleteContact(req.params.id);
            res.status(200).json({ status: true, message: "Contact deleted successfully." });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    },

    async markAsRead(req, res) {
        try {
            const contact = await contactService.markAsRead(req.params.id);
            res.status(200).json({ status: true, data: contact, message: "Marked as read." });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    },

    async getStats(req, res) {
        try {
            const stats = await contactService.getContactStats();
            res.status(200).json({ status: true, data: stats });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    },
};

export default contactController;
