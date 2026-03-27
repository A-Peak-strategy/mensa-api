import { admin, db } from '../config/firebase.js';

export const createUserWithEmailAndPassword = async (email, password, fullname) => {
    try {
        const userRecord = await admin.auth().createUser({
            email,
            password
        });
        if(userRecord){
            await db.collection('users').doc(userRecord.uid).set({
                uid: userRecord.uid,
                email: userRecord.email,
                fullname: fullname,
                role : "user",
                createdAt : new Date()
            });
        }
        return userRecord;
    } catch (error) {
        throw error;
    }
}
