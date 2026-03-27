import { db } from "../config/firebase.js";

class Quote {
    constructor({ name, email, phone, eventType, guestCount, eventDate, budget, message }) {
        this.name = name || "";
        this.email = email || "";
        this.phone = phone || "";
        this.eventType = eventType || "";
        this.guestCount = guestCount || "";
        this.eventDate = eventDate || "";
        this.budget = budget || "";
        this.message = message || "";
        this.status = "pending"; // pending, reviewed, contacted, completed, cancelled
        this.notes = ""; // Admin notes
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }

    static collection = db.collection("quotes");

    toJSON() {
        return {
            name: this.name,
            email: this.email,
            phone: this.phone,
            eventType: this.eventType,
            guestCount: this.guestCount,
            eventDate: this.eventDate,
            budget: this.budget,
            message: this.message,
            status: this.status,
            notes: this.notes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}

export default Quote;
