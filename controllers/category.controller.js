import { createCategory, deleteCategory, getAllCategory, getCategoryById, updateCategory } from "../services/category.service.js";
import { uploadImages } from "../services/imageUpload.service.js";

const categoryController = {
    async create (req, res) {
        try {
            const categoryData = req.body;

            if (req.files && req.files.length > 0) {
                console.error("Files are detected >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                categoryData.imageUrls = await Promise.all(
                    req.files.map(file => uploadImages(file))
                )
            }

            const category = await createCategory(categoryData);
            res.status(200).json({
                status: true,
                data: category,
                message: 'Category created successfully.'
            });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    },
    async getById (req, res) {
        try {
            const category = await getCategoryById(req.params.id);
            res.status(200).json({ status: true, data: category });
        } catch (error) {
            res.status(404).json({ status: false, error: error.message });
        }
    },
    async getAll  (req, res) {
        try {
            const categories = await getAllCategory();
            res.status(200).json({ status: true, data: categories });
        } catch (error) {
            res.status(404).json({ status: false, error: error.message });
        }
    },
    async deleteById (req, res) {
        try {
            await deleteCategory(req.params.id);
            res.status(200).json({ status: true, message: 'Category deleted successfully.' });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });            
        }
    },
    async updateCategoryById (req, res) {
        try {
            const updateData = req.body;

            if (req.files && req.files.length > 0) {
                updateData.imageUrls = await Promise.all(
                req.files.map(file => uploadImages(file))
                );
            }

            const updatedCategory = await updateCategory(req.params.id, updateData);
            res.status(200).json({ status: true, data: updatedCategory, message: 'Category Details updated successfully.' });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    }
}

export default categoryController;