import Event from "../models/event.model.js";

export const createEvent = async (data) => {
  try {
    const event = new Event(data);
    const ref = await Event.collection.add(event.toJSON());
    return { id: ref.id, ...event.toJSON() };
  } catch (error) {
    throw error;
  }
};

export const getEventById = async (id) => {
  try {
    const doc = await Event.collection.doc(id).get();
    if (!doc.exists) throw new Error("Event not found.");
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    throw error;
  }
};

export const getAllEvents = async () => {
  try {
    const snap = await Event.collection.get();
    const events = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    events.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    return events;
  } catch (error) {
    throw error;
  }
};

export const updateEvent = async (id, updateData) => {
  try {
    const ref = Event.collection.doc(id);
    const doc = await ref.get();
    if (!doc.exists) throw new Error("Event not found.");
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

export const deleteEvent = async (id) => {
  try {
    const ref = Event.collection.doc(id);
    const doc = await ref.get();
    if (!doc.exists) throw new Error("Event not found.");
    await ref.delete();
    return { message: "Event deleted successfully." };
  } catch (error) {
    throw error;
  }
};
