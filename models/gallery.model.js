import { db } from "../config/firebase.js";

class Gallery {
    constructor({ title, description, image, order }) {
        this.title = title || "";
        this.description = description || "";
        this.image = image || null; // { url, public_id }
        this.order = order || 0;
        this.isActive = true;
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }

    static collection = db.collection("gallery");

    toJSON() {
        return {
            title: this.title,
            description: this.description,
            image: this.image,
            order: this.order,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}

export default Gallery;
