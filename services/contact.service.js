import Contact from "../models/contact.model.js";

export const createContact = async (data) => {
    try {
        const contact = new Contact(data);
        const docRef = await Contact.collection.add(contact.toJSON());
        return { id: docRef.id, ...contact.toJSON() };
    } catch (error) {
        throw error;
    }
};

export const getAllContacts = async (status = null) => {
    try {
        let query = Contact.collection;
        if (status) {
            query = query.where("status", "==", status);
        }
        const snap = await query.orderBy("createdAt", "desc").get();
        return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        throw error;
    }
};

export const getContactById = async (id) => {
    try {
        const doc = await Contact.collection.doc(id).get();
        if (!doc.exists) throw new Error("Contact message not found");
        return { id: doc.id, ...doc.data() };
    } catch (error) {
        throw error;
    }
};

export const updateContact = async (id, data) => {
    try {
        const updateData = {
            ...data,
            updatedAt: new Date().toISOString(),
        };
        await Contact.collection.doc(id).update(updateData);
        return await getContactById(id);
    } catch (error) {
        throw error;
    }
};

export const deleteContact = async (id) => {
    try {
        await Contact.collection.doc(id).delete();
        return { success: true };
    } catch (error) {
        throw error;
    }
};

export const markAsRead = async (id) => {
    try {
        return await updateContact(id, { status: "read" });
    } catch (error) {
        throw error;
    }
};

export const getContactStats = async () => {
    try {
        const snap = await Contact.collection.get();
        const contacts = snap.docs.map((doc) => doc.data());
        const stats = {
            total: contacts.length,
            unread: contacts.filter((c) => c.status === "unread").length,
            read: contacts.filter((c) => c.status === "read").length,
            responded: contacts.filter((c) => c.status === "responded").length,
        };
        return stats;
    } catch (error) {
        throw error;
    }
};
