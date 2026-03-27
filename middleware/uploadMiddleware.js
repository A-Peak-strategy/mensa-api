import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10*1024*1024, // 10MB
        files: 5
    },
    fileFilter: (req, file, cb) => {
        const allowsMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp'
        ];

        if(allowsMimeTypes.includes(file.mimetype)){
            cb(null, true);
        }else{
            cb(new Error('Only image files (JPEG, PNG, GIF, WEBP) are allowed'), false);
        }
    }
})

export default upload;