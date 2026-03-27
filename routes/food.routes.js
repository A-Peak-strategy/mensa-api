import express from 'express';
import { body } from 'express-validator';
import uploadMiddleware from '../middleware/uploadMiddleware.js';
import foodController from '../controllers/food.controller.js';

const router = express.Router();

export const foodValidationRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('basePrice').isNumeric().withMessage('Base price must be a number'),
    body('variations').notEmpty().withMessage('Variations are required')
];

router.post(
    '/create',
    // authMiddleware,
    uploadMiddleware.array('images', 5),
    foodValidationRules,
    foodController.createFood
);

router.get(
    '/',
    foodController.getAllFoods
);

router.get(
    '/:id',
    foodController.getById
);

router.get(
    '/getByCategoryId/:id',
    foodController.getByCategoryId
);

router.get(
    '/names/ids',
    foodController.getNamesAndIds
);

router.put(
    '/update/:id',
    uploadMiddleware.array('images', 5),
    foodController.updateFood
);

router.delete(
    '/delete/:id',
    // authMiddleware,
    foodController.delete
);

export default router;