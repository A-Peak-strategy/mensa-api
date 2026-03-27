import express from 'express';
import { body } from 'express-validator';
import OrderController from '../controllers/order.controller.js';

const router = express.Router();

const orderValidationRules = [
    body('user_id')
    .notEmpty().withMessage('User ID is required')
    .isString().withMessage('User ID must be a string'),

    body('user_email')
    .notEmpty().withMessage('User email is required')
    .isEmail().withMessage('Invalid email'),

    body('user_mobile')
    .notEmpty().withMessage('User mobile number is required')
    .matches(/^\d{10}$/).withMessage('Mobile number must be 10 digits'),

    body('deliveryDate')
    .notEmpty().withMessage('Delivery date is required')
    .isISO8601().withMessage('Invalid date format'),

    body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['pending', 'confirmed', 'delivered', 'cancelled'])
    .withMessage('Invalid status value'),

    body('items')
    .isArray({ min: 1 }).withMessage('Items must be a non-empty array'),

    body('items.*.type')
    .notEmpty().withMessage('Item type is required')
    .isString().withMessage('Item type must be a string'),

    body('items.*.quantity')
    .optional()
    .isNumeric().withMessage('Item quantity must be a number')
];

router.post(
    '/create',
    // authMiddleware,
    orderValidationRules,
    OrderController.createOrder
);

router.get(
    '/get-all',
    // authMiddleware,
    OrderController.getAllOrders
);

router.get(
    '/:id',
    // authMiddleware,
    OrderController.getOrderById
);

router.put(
    '/update/:id',
    // authMiddleware,
    OrderController.updateOrder
);

router.delete(
    '/delete/:id',
    // Todo ; authMiddleware
    OrderController.deleteOrder
);

router.post(
    '/updateStatus/:id',
    // authMiddleware,
    OrderController.updateOrderStatus
);

router.get(
    '/getByUserId/:userId',
    // authMiddleware,
    OrderController.getOrderByUserId
);

export default router;