import cloudinary from '../config/cloudinary.js';
import { v4 as uuidv4 } from 'uuid';


export const uploadImages = async (file) => {
    return new Promise((resolve, reject) => {
        const uploadOptions = {
            public_id: `products/${uuidv4()}`,
            folder: 'mensa',
            resource_type: 'auto'
        };

        const uploadStream = cloudinary.uploader.upload_stream(
            uploadOptions,
            (error, result) => {
                if (error) return reject(error);
                resolve({
                    url: result.secure_url,
                    public_id: result.public_id,
                    width: result.width,
                    height: result.height,
                    format: result.format
                });
            }
        );

        uploadStream.end(file.buffer);
    });
}

export const deleteProductImage = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
    }
}