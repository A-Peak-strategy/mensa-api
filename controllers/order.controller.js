import OrderService from "../services/orders.service.js";

const OrderController = {
    async createOrder(req, res) {
        try {
            const { user_id, user_email, user_mobile, deliveryDate, status, items,paymentMethod, user_name, deliveryAddress, specialNotes,total } = req.body;
            const orderData = { user_id, user_email, user_mobile, deliveryDate, status, createdAt: new Date(),paymentMethod, user_name, deliveryAddress, specialNotes,total };

            const order = await OrderService.createOrder(orderData,items);
            res.status(200).json({
                status:true,
                message:'Order created successfully!',
                data: order
            });
        } catch (error) {
            res.status(500).json({ 
                status:false,
                error: error.message 
            });
        }
    },

    async getAllOrders(req, res) {
        try {
            const orders = await OrderService.getAllOrder();
            res.status(200).json({
                status:true,
                message:'Orders fetched successfully!',
                data: orders
            });
        } catch (error) {
            res.status(500).json({ 
                status:false,
                error: error.message 
            });
        }
    },

    async getOrderById(req, res) {
        try {
            const { id } = req.params;
            const order = await OrderService.getOrderById(id);

            if (!order) return res.status(404).json({ status:false, error: 'Order not found' });

            res.status(200).json({
                status:true,
                message:'Order fetched successfully!',
                data: order
            });
        } catch (error) {
            res.status(500).json({ 
                status:false,
                error: error.message 
            });
        }
    },

    async updateOrder(req, res) {
        try {
        const { id } = req.params;
        const { user_email, user_mobile, deliveryDate, status } = req.body;
    
        await OrderService.updateOrder(id, { user_email, user_mobile, deliveryDate, status });
        res.status(200).json({
            status:true,
            message:'Order updated successfully!',
        });
        } catch (error) {
            res.status(500).json({ 
                status:false,
                error: error.message 
            });
        }
    },

    async deleteOrder(req, res) {
        try {
        const { id } = req.params;
        await OrderService.deleteOrder(id);
        res.status(200).json({
            status:true,
            message:'Order deleted successfully!',
        });
        } catch (error) {
            res.status(500).json({ 
                status:false,
                error: error.message 
            });
        }
    },

    async updateOrderStatus (req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const UpdatedOrder = await OrderService.updateOrderStatus(id, status);

            if(!UpdatedOrder){
                res.status(500).json({ 
                    status:false,
                    error: "Order Not Found."
                });
            }

            res.status(200).json({
                status:true,
                message:'Status Updated Successfully!',
            });
        } catch (error) {
            res.status(500).json({ 
                status:false,
                error: error.message 
            });
        }
    },

    async getOrderByUserId(req, res) {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ status: false, error: 'User ID is required.' });
        }

        try {
            const orders= await OrderService.getOrdersByUserId(userId);
            if(orders.length > 0){
                res.status(200).json({
                    status:true,
                    message:'Orders fetched successfully!',
                    data: orders
                });
            }
            res.status(500).json({ 
                status:false,
                error: "Orders Not Found."
            });
        } catch (error) {
            res.status(500).json({ 
                status:false,
                error: error.message 
            });
        }
    }

}

export default OrderController;