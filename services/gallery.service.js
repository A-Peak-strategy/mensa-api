import Gallery from "../models/gallery.model.js";

export const createGalleryImage = async (data) => {
    try {
        const gallery = new Gallery(data);
        const ref = await Gallery.collection.add(gallery.toJSON());
        return { id: ref.id, ...gallery.toJSON() };
    } catch (error) {
        throw error;
    }
};

export const getGalleryImageById = async (id) => {
    try {
        const doc = await Gallery.collection.doc(id).get();
        if (!doc.exists) throw new Error("Gallery image not found.");
        return { id: doc.id, ...doc.data() };
    } catch (error) {
        throw error;
    }
};

export const getAllGalleryImages = async (activeOnly = false) => {
    try {
        let query = Gallery.collection;
        if (activeOnly) {
            query = query.where("isActive", "==", true);
        }
        const snap = await query.get();
        const images = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        // Sort by order first, then by createdAt
        images.sort((a, b) => {
            if (a.order !== b.order) return a.order - b.order;
            return (b.createdAt || "").localeCompare(a.createdAt || "");
        });
        return images;
    } catch (error) {
        throw error;
    }
};

export const updateGalleryImage = async (id, updateData) => {
    try {
        const ref = Gallery.collection.doc(id);
        const doc = await ref.get();
        if (!doc.exists) throw new Error("Gallery image not found.");
        const payload = {
            ...updateData,
            updatedAt: new Date().toISOString(),
        };
        await ref.update(payload);
        return { id, ...doc.data(), ...payload };
    } catch (error) {
        throw error;
    }
};

export const deleteGalleryImage = async (id) => {
    try {
        const ref = Gallery.collection.doc(id);
        const doc = await ref.get();
        if (!doc.exists) throw new Error("Gallery image not found.");
        await ref.delete();
        return { message: "Gallery image deleted successfully." };
    } catch (error) {
        throw error;
    }
};

export const reorderGalleryImages = async (orderedIds) => {
    try {
        const batch = [];
        for (let i = 0; i < orderedIds.length; i++) {
            const ref = Gallery.collection.doc(orderedIds[i]);
            batch.push(ref.update({ order: i, updatedAt: new Date().toISOString() }));
        }
        await Promise.all(batch);
        return { message: "Gallery reordered successfully." };
    } catch (error) {
        throw error;
    }
};
