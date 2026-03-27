import { getAllUsers, getUserByEmail, getUserById } from "../services/user.service.js"

export const fetchAllUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({
            status: true,
            message: 'Fetch all users successfully.',
            data: users
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error in fetching all users.',
            error: error.message
        });
    }
}

export const fetchUserById = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await getUserById(id);
        res.status(200).json({
            status: true,
            message: 'Fetch user details successfully.',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error in fetching user details.',
            error: error.message
        });
    }
}

export const fetchUserByEmail = async (req, res) => {
    const {email} = req.body;
    if (!email) return res.status(400).json({ status: false, message: "Email is required" });
    try {
        const user = await getUserByEmail(email);
        res.status(200).json({
            status: true,
            message: 'Fetch user details successfully.',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error in fetching user details.',
            error: error.message
        });
    } 
}