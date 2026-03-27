import { db } from "../config/firebase.js";

export class Food {
    constructor({ name, description, basePrice, categoryId, categoryName, imageUrls, variations }) {
        this.name = name;
        this.description = description;
        this.basePrice = basePrice;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.imageUrls = imageUrls || [];
        this.variations = variations || [];
        this.createdAt = new Date();
    }

    toJSON() {
        return {
            name: this.name,
            description: this.description,
            basePrice: this.basePrice,
            categoryId: this.categoryId,
            categoryName: this.categoryName,
            imageUrls: this.imageUrls,
            variations: this.variations,
            createdAt: this.createdAt
        };
    }

    static collection = db.collection('foods');
}