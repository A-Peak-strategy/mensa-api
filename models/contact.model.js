import { db } from "../config/firebase.js";

class Contact {
    constructor({ name, email, subject, message }) {
        this.name = name || "";
        this.email = email || "";
        this.subject = subject || "";
        this.message = message || "";
        this.status = "unread"; // unread, read, responded
        this.notes = ""; // Admin notes
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }

    static collection = db.collection("contacts");

    toJSON() {
        return {
            name: this.name,
            email: this.email,
            subject: this.subject,
            message: this.message,
            status: this.status,
            notes: this.notes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}

export default Contact;
