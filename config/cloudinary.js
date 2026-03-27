import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();

// Support both CLOUDINARY_URL and individual env vars
if (process.env.CLOUDINARY_URL) {
    // CLOUDINARY_URL format: cloudinary://api_key:api_secret@cloud_name
    // The cloudinary SDK automatically parses CLOUDINARY_URL
    cloudinary.config();
} else {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
}

console.log("Cloudinary configured.");

export default cloudinary;