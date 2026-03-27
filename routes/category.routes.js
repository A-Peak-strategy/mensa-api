import express from 'express';
import categoryController from '../controllers/category.controller.js';
import uploadMiddleware from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post(
    '/create',
    uploadMiddleware.array('images', 2),
    categoryController.create
);

router.get(
    '/',
    categoryController.getAll
);

router.get(
    '/:id',
    categoryController.getById
);

router.put(
    '/update/:id',
    uploadMiddleware.array('images', 2),
    categoryController.updateCategoryById
);

router.delete(
    '/delete/:id',
    categoryController.deleteById
);

export default router;
