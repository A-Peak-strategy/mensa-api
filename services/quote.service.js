import Quote from "../models/quote.model.js";

export const createQuote = async (data) => {
    try {
        const quote = new Quote(data);
        const docRef = await Quote.collection.add(quote.toJSON());
        return { id: docRef.id, ...quote.toJSON() };
    } catch (error) {
        throw error;
    }
};

export const getAllQuotes = async (status = null) => {
    try {
        let query = Quote.collection;
        if (status) {
            query = query.where("status", "==", status);
        }
        const snap = await query.orderBy("createdAt", "desc").get();
        return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        throw error;
    }
};

export const getQuoteById = async (id) => {
    try {
        const doc = await Quote.collection.doc(id).get();
        if (!doc.exists) throw new Error("Quote not found");
        return { id: doc.id, ...doc.data() };
    } catch (error) {
        throw error;
    }
};

export const updateQuote = async (id, data) => {
    try {
        const updateData = {
            ...data,
            updatedAt: new Date().toISOString(),
        };
        await Quote.collection.doc(id).update(updateData);
        return await getQuoteById(id);
    } catch (error) {
        throw error;
    }
};

export const deleteQuote = async (id) => {
    try {
        await Quote.collection.doc(id).delete();
        return { success: true };
    } catch (error) {
        throw error;
    }
};

export const getQuoteStats = async () => {
    try {
        const snap = await Quote.collection.get();
        const quotes = snap.docs.map((doc) => doc.data());
        const stats = {
            total: quotes.length,
            pending: quotes.filter((q) => q.status === "pending").length,
            reviewed: quotes.filter((q) => q.status === "reviewed").length,
            contacted: quotes.filter((q) => q.status === "contacted").length,
            completed: quotes.filter((q) => q.status === "completed").length,
            cancelled: quotes.filter((q) => q.status === "cancelled").length,
        };
        return stats;
    } catch (error) {
        throw error;
    }
};
