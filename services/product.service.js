import Product from "../models/product.model.js"

export const createProduct = async (productData) =>{
    try {
        const product = new Product(productData);
        const productRef = await Product.collection.add(product.toJSON());
        return {id: productRef.id, ...product.toJSON()}
    } catch (error) {
        throw error;
    }
}

export const getProductById = async (id) =>{
    try {
        const productDoc = await Product.collection.doc(id).get();
        if (!productDoc.exists) {
            throw new Error('Product not found');
        }
        return { id: productDoc.id, ...productDoc.data() };
    } catch (error) {
        throw error;
    }
}

export const getAllProducts = async ({limit = 10, page = 1, categoryId}) => {
    try {
        let query = Product.collection.limit(limit).offset((page -1)*limit);
        if(categoryId){
            query = query.where('categoryId','==', categoryId);
        }
        const snapshot = await query.get();
        return snapshot.docs.map(doc => ({ id : doc.id, ...doc.data() }));
    } catch (error) {
        throw error;
    }
}

export const updateProduct = async (id, updateData) => {
    try {
        const productRef = Product.collection.doc(id);
        const productDoc = await productRef.get();
        if(! productDoc.exists) throw new Error ('Product Not found.');
        await productRef.update({
            ...updateData,
            updateAt: new Date().toISOString()
        });
        const updateDoc = await productRef.get();
        return { id: updateDoc.id, ...updateDoc.data()};
    } catch (error) {
        throw error;
    }
}

export const deleteProduct = async (id) => {
    try {
        const productRef = Product.collection.doc(id);
        const productDoc = await productRef.get()
        if(!productDoc.exists) throw new Error ('Product Not found.');
        await productRef.delete();
        return { message : 'Product deleted successfully' };
    } catch (error) {
        throw error;
    }
}