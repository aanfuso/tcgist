import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';

const FIREBASE_CONFIG = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

const app = initializeApp(FIREBASE_CONFIG);
export const db = getDatabase(app);
export const analytics = getAnalytics(app);
