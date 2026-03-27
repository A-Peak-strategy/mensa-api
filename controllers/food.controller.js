import foodService from "../services/food.service.js";
import { uploadImages } from "../services/imageUpload.service.js";
import { validationResult } from 'express-validator';

const foodController = {
    async createFood (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: false, errors: errors.array() });
            }

            const foodData = req.body;

            if (typeof foodData.variations === 'string') {
                foodData.variations = JSON.parse(foodData.variations);
            }

            if(req.files && req.files.length > 0){
                console.error("Files are detected >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                foodData.imageUrls = await Promise.all(
                    req.files.map(file => uploadImages(file))
                )
            }

            const food = await foodService.createFood(foodData);
            res.status(200).json({
                status: true,
                data: food,
                message: 'Product created successfully.'
            });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    },
    async getAllFoods (req, res) {
        try {
            const foods = await foodService.getAllFoods();
            res.status(200).json({ status: true, data: foods });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    },
    async getById (req, res) {
        try {
            const food = await foodService.getById(req.params.id);
            res.status(200).json({ status: true, data: food });
        } catch (error) {
            res.status(404).json({ status: false, error: error.message });
        }
    },
    async getByCategoryId (req, res) {
        try {
            const foods = await foodService.getByCategoryId(req.params.id);
            res.status(200).json({ status: true, data: foods });
        } catch (error) {
            res.status(404).json({ status: false, error: error.message });
        }
    },
    async getNamesAndIds (req, res) {
        try {
            const foods = await foodService.getFoodNamesAndIds();
            res.status(200).json({ status: true, data: foods });
        } catch (error) {
            res.status(404).json({ status: false, error: error.message });
        }
    },
    async updateFood (req, res) {
        try {
            const updateData = req.body;

            if (req.files && req.files.length > 0) {
                updateData.imageUrls = await Promise.all(
                req.files.map(file => uploadImages(file))
                );
            }

            const updatedProduct = await foodService.updateFoods(req.params.id, updateData);
            res.status(200).json({ status: true, data: updatedProduct, message: 'Food Details updated successfully.' });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    },
    async delete (req, res) {
        try {
            await foodService.deleteFood(req.params.id);
            res.status(200).json({ status: true, message: 'Product deleted successfully.' });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    }
}

export default foodController;