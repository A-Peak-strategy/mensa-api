import { db } from "../config/firebase.js";

class Event {
  constructor({ title, category, price, description, longDescription, image }) {
    this.title = title;
    this.category = category; // birthday | hightea | anniversary | seasonal
    this.price = price;
    this.description = description || "";
    this.longDescription = longDescription || "";
    this.image = image || null; // { url } or null
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  static collection = db.collection("events");

  toJSON() {
    return {
      title: this.title,
      category: this.category,
      price: this.price,
      description: this.description,
      longDescription: this.longDescription,
      image: this.image,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export default Event;
