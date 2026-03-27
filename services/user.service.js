import { db } from "../config/firebase.js"

export const getAllUsers = async () => {
    try {
        const userSnapshot = await db.collection('users').get();
        return userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        throw error;
    }
}

export const getUserById = async (uid) => {
    try {
        const userDoc = await db.collection('users').doc(uid).get();
        if(userDoc.exists){
            return {
                id : userDoc.id,
                ...userDoc.data()
            }
        }else{
            throw new Error('User not found');
        }
    } catch (error) {
        throw error;
    }
}

export const getUserByEmail = async (email) => {
    try {
        const userQuerySnapshot = await db.collection('users').where('email', '==' , email).get();
        if(!userQuerySnapshot.empty){
            const userDoc = userQuerySnapshot.docs[0];
            return {
                id : userDoc.id,
                ...userDoc.data()
            }
        }else{
            throw new Error('User not found');
        }
    } catch (error) {
        throw error;
    }
}