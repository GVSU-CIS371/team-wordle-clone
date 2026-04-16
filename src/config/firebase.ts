import admin from 'firebase-admin'
import 'dotenv/config';

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurmentId
};

const app = admin.initializeApp(firebaseConfig);

export const db = admin.firestore(app);