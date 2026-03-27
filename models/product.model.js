import { db } from "../config/firebase.js";

class Product {
    constructor({name, description, price, categoryId, imageUrls = [], createdAt, updatedAt}){
        this.name = name,
        this.description = description,
        this.price = price,
        this.categoryId = categoryId,
        this.imageUrls = imageUrls,
        this.createdAt = createdAt || new Date().toISOString();
        this.updatedAt = updatedAt || new Date().toISOString();
    }

    static collection = db.collection('products');

    toJSON(){
        return {
            name : this.name,
            description : this.description,
            price : this.price,
            //TODO : add foreign key for category id
            categoryId : this.categoryId,
            imageUrls : this.imageUrls,
            createdAt : this.createdAt,
            updatedAt : this.updatedAt
        };
    }
}

export default Product;