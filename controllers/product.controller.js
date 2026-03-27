import { uploadImages } from '../services/imageUpload.service.js';
import {  createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../services/product.service.js';
import { validationResult } from 'express-validator';

export const create = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                status: false,
                errors: errors.array()
            })
        }

        const productData = req.body;
        if(req.body.file || req.files.length > 0){
            console.error("Files are detected >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            productData.imageUrls = await Promise.all(
                req.files.map(file => uploadImages(file))
            )
        }

        const product = await createProduct(productData);
        res.status(200).json({
            status: true,
            data : product,
            message : 'Product created successfully.'
        })
    } catch (error) {
        // next(error)
        res.status(500).json({
            status : false,
            error : error.message
        });
    }
}

export const getAll = async (req, res, next) => {
    try {
        const { limit, page, categoryId } = req.body;
        const products = await getAllProducts({
            limit: parseInt(limit) || 10,
            page: parseInt(page) | 1,
            categoryId
        });
        if(!products.length >0){
            res.status(500).json({
                status: false,
                message: 'Error in fetching all products.'
            });
        }

        res.status(200).json({
            status: true,
            message: "Fetch all products successfully.",
            data: products
        })
    } catch (error) {
        // next(error)
        res.status(500).json({
            status : false,
            error : error.message
        });
    }
}

export const getById = async (req, res, next) => {
    try {
        const product =await getProductById(req.params.id);
        if(!product){
            res.status(500).json({
                status : false,
                error : 'category not found.'
            });
        }
        res.status(200).json({
            status: true,
            message : 'fetch category successfully.',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            status : false,
            error : error.message
        })
    }
}

export const update = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ status: false, errors: errors.array() });
        }
        const updateData = req.body;
        if(req.body.file || req.files.length > 0){
            console.error("Files are detected >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            updateData.imageUrls = await Promise.all(
                req.files.map(file => uploadImages(file))
            )
        }
        const product = await updateProduct(req.params.id, updateData);
        res.status(200).json({
            status : true,
            message : `"Update product successfully"`,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

export const deleteById = async(req, res,next) => {
    try {
        await deleteProduct(req.params.id);
        res.status(200).json({
            status: true,
            message: ' Delete product successfully.',
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        })
    }
}