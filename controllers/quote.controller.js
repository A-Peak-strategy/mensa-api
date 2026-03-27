import * as quoteService from "../services/quote.service.js";

const quoteController = {
    async create(req, res) {
        try {
            const { name, email, phone, eventType, guestCount, eventDate, budget, message } = req.body;
            if (!name || !email || !eventType || !eventDate) {
                return res.status(400).json({ status: false, error: "Name, email, event type, and event date are required." });
            }
            const quote = await quoteService.createQuote({
                name,
                email,
                phone,
                eventType,
                guestCount,
                eventDate,
                budget,
                message,
            });
            res.status(201).json({ status: true, data: quote, message: "Quote request submitted successfully." });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    },

    async getAll(req, res) {
        try {
            const { status } = req.query;
            const quotes = await quoteService.getAllQuotes(status || null);
            res.status(200).json({ status: true, data: quotes });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    },

    async getById(req, res) {
        try {
            const quote = await quoteService.getQuoteById(req.params.id);
            res.status(200).json({ status: true, data: quote });
        } catch (error) {
            res.status(404).json({ status: false, error: error.message });
        }
    },

    async update(req, res) {
        try {
            const updated = await quoteService.updateQuote(req.params.id, req.body);
            res.status(200).json({ status: true, data: updated, message: "Quote updated successfully." });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    },

    async delete(req, res) {
        try {
            await quoteService.deleteQuote(req.params.id);
            res.status(200).json({ status: true, message: "Quote deleted successfully." });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    },

    async getStats(req, res) {
        try {
            const stats = await quoteService.getQuoteStats();
            res.status(200).json({ status: true, data: stats });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    },
};

export default quoteController;
