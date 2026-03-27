import Category from "../models/category.model.js"

export const createCategory = async (data) => {
    try {
        const category = new Category(data);
        const categoryRef = await  Category.collection.add(category.toJSON());
        return {id: categoryRef.id, ...category.toJSON()}
    } catch (error) {
        throw error;
    }
}

export const getCategoryById = async (id) => {
    try {
        const categoryDoc = await Category.collection.doc(id).get();
        if(!categoryDoc.exists){
            throw new Error('Category not found.');
        }
        return {id:categoryDoc.id, ...categoryDoc.data()};
    } catch (error) {
        throw error;
    }
}

export const getAllCategory = async () => {
    try {
        const categorySnap = await Category.collection.get();
        return categorySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        throw error;
    }
}

export const deleteCategory = async (id) => {
    try {
        const categoryDef = Category.collection.doc(id);
        if(!(await categoryDef.get()).exists){
            throw new Error('Category not found.');
        }
        await categoryDef.delete();
        return { message : 'Category deleted successfully.' }
    } catch (error) {
        throw error;
    }
}

export const updateCategory = async (id, updateData) => {
    try {
        const categoryRef = Category.collection.doc(id);
        if(! (await categoryRef.get()).exists){
            throw new Error('category not found.')
        }
        await categoryRef.update({
            ...updateData,
            updateAt : new Date().toISOString()
        })
    } catch (error) {
        throw error;
    }
}