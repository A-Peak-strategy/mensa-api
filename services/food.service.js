import { db } from "../config/firebase.js";
import { Food } from "../models/food.model.js"

const foodService ={
    async createFood (foodData) {
        const food = new Food(foodData);
        const foodRef = await Food.collection.add(food.toJSON());
        return {
            id : foodRef.id,
            ...food.toJSON()
        }
    },
    async getAllFoods () {
        const snapshot = await db.collection('foods').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    async getById (id) {
        const doc = await db.collection('foods').doc(id).get();
        if (!doc.exists) {
            throw new Error('Product not found');
        }
        return { id: doc.id, ...doc.data() };
    },
    async getByCategoryId(id) {
        const snapshot = await db.collection('foods').where('categoryId', '==', id).get();

        if (snapshot.empty) {
            throw new Error('No products found for this category');
        }

        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return products;
    },
    async getFoodNamesAndIds () {
        const snapshot = await db.collection('foods').get();
        return snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name,description: doc.data().description, images: doc.data().imageUrls }));
    },
    async updateFoods (id, updateData) {
        updateData.updateAt = new Date();
        await db.collection('foods').doc(id).update(updateData);
        const updatedDoc = await db.collection('products').doc(id).get();
        return { id: updatedDoc.id, ...updatedDoc.data() };
    },
    async deleteFood (id) {
        await db.collection('foods').doc(id).delete();
    }
}

export default foodService;