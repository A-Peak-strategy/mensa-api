import { admin } from "../config/firebase.js";

async function authMiddleware(req, res, next){
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({
                status:false,
                message : 'Unauthorized'
            });
        }

        const token = authHeader.split(' ')[1];
        const decodeToken = await admin.auth().verifyIdToken(token);
        req.user = decodeToken;
        next();
    } catch (error) {
        res.status(401).json({
            status:false,
            message : 'Unauthorized' 
        });
    }
}

export default authMiddleware;