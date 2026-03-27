import express from 'express';
import { check } from 'express-validator';

import { create as createProduct, deleteById as deleteProductById, getAll as getAllProducts, getById as getProductById, update as updateProduct } from '../controllers/product.controller.js';
import uploadMiddleware from '../middleware/uploadMiddleware.js';

const router = express.Router();

const productValidationRules = [
    check('name').notEmpty().withMessage('Name is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    check('categoryId').notEmpty().withMessage('Category is required'),
]

router.post(
    '/create',
    // authMiddleware,
    uploadMiddleware.array('images', 5),
    productValidationRules,
    createProduct
);

router.get(
    '/get-all',
    getAllProducts
);

router.get(
    '/:id',
    getProductById
);

router.put(
    '/update/:id',
    // authMiddleware,
    uploadMiddleware.array("images", 5),
    productValidationRules,
    updateProduct
);

router.delete(
    '/delete/:id',
    // authMiddleware,
    deleteProductById
)

export default router;
