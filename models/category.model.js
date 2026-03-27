import { db } from "../config/firebase.js";

class Category {
    constructor({name, description, imageUrls}){
        this.name = name,
        this.description = description,
        this.imageUrls = imageUrls || [];
        this.createdAt =new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }

    static collection = db.collection('categories');

    toJSON(){
        return{
            name : this.name,
            description : this.description,
            imageUrls : this.imageUrls,
            createdAt : this.createdAt,
            updatedAt : this.updatedAt
        }
    }
}

export default Category;