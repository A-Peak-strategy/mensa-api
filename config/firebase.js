import admin from 'firebase-admin';
import fs from 'fs';

let credential;
console.log(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);

if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    try {
        const serviceAccount = JSON.parse(
            fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_PATH, 'utf8')
        );
        credential = admin.credential.cert(serviceAccount);
    } catch (error) {
        throw new Error(`Failed to load Firebase service account file: ${error.message}`);
    }
} else if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        credential = admin.credential.cert(serviceAccount);
    } catch (error) {
        throw new Error(
            'Invalid Firebase service account JSON in FIREBASE_SERVICE_ACCOUNT_KEY'
        );
    }
} else {
    throw new Error(
        'Firebase service account not configured. Provide either FIREBASE_SERVICE_ACCOUNT_PATH or FIREBASE_SERVICE_ACCOUNT_KEY'
    );
}

if (!admin.apps.length) {
    admin.initializeApp({ credential });
}

const db = admin.firestore();

export { admin, db };