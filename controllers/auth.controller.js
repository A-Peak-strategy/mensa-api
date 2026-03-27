import { createUserWithEmailAndPassword } from "../services/auth.service.js";

export const signup = async (req, res) => {
    const { email, password, fullname } = req.body;

    if (!email || !password || !fullname) {
        return res.status(400).json({
            status: false,
            message: 'Missing required fields: email, password, or fullName.',
        });
    }

    try {
        const user = await createUserWithEmailAndPassword(email, password, fullname);
        res.status(200).json({
            status : true,
            message : 'User creates successfully.',
            data : {
                uid: user.uid,
                email: user.email,
                fullname: fullname
            }
        });
    } catch (error) {
        res.status(400).json({
            status:false,
            message: 'User creation failed.',
            error : error.message
        });
    }
}