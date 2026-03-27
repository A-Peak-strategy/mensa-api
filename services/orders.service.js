import { db } from "../config/firebase.js";

const OrderService = {
    async createOrder(orderData, items) {
        const orderRef = await db.collection('orders').add(orderData);
        const itemsRef = orderRef.collection('items');
        for(const item of items){
            await itemsRef.add(item);
        }

        return orderRef.id;
    },

    async getAllOrder() {
        const snapshot = await db.collection('orders').get();
        const orders = [];
        for (const doc of snapshot.docs) {
            const orderData = doc.data();
            const itemSnap = await doc.ref.collection('items').get();
            const items = itemSnap.docs.map(doc => doc.data());
            orders.push({ id:doc.id, ...orderData, items });
        }
        return orders;
    },

    async getOrderById(orderId) {
        const orderDoc = await db.collection('orders').doc(orderId).get();

        if (!orderDoc.exists) return null;

        const orderData = orderDoc.data();
        const itemsSnap = await orderDoc.ref.collection('items').get();
        const items = itemsSnap.docs.map(doc => doc.data());

        return { id:orderDoc.id, ...orderData, items }
    },

    async updateOrder(orderId, orderData) {
        await db.collection('orders').doc(orderId).update(orderData);
        return true;
    },

    async deleteOrder(orderId) {
        const orderRef = db.collection('order').doc(orderId);
        const itemsSnap = await orderRef.collection('items').get();

        for (const doc of itemsSnap.docs) {
            await doc.ref.delete();
        }

        await orderRef.delete();
        return true;
    },

    async updateOrderStatus(orderId, status) {
        const orderRef = db.collection('orders').doc(orderId);
        const orderDoc = await orderRef.get();

        if(!orderDoc.exists) return null;

        await orderRef.update({ status });
        return true;
    },

    async getOrdersByUserId(userId) {
        if (!userId) {
            throw new Error('User ID is undefined');
        }

        const orderDocs = await db.collection('orders').where('user_id', '==', userId).get();

        if (orderDocs.empty) {
        return []; 
        }

        const orders=[];
        for (const doc of orderDocs.docs) {
            const orderData = doc.data();
            const orderId = doc.id;

            const itemSnap = await db.collection('orders').doc(orderId).collection('items').get();

            const items = [];
            itemSnap.forEach(itemDoc => {
                items.push({ id:itemDoc.id, ...itemDoc.data() });
            });

            orders.push({
                id:orderId,
                ...orderData,
                items
            })
        }
        return orders;
    }
}

export default OrderService;