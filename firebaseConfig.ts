import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// IMPORTANT: Replace the placeholders with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW59c7jwY8gej6zT8oJey31aSQrlwtIPk",
  authDomain: "aspsuite-f6f93.firebaseapp.com",
  projectId: "aspsuite-f6f93",
  storageBucket: "aspsuite-f6f93.firebasestorage.app",
  messagingSenderId: "772576327508",
  appId: "1:772576327508:web:d8930a603146c973a1fac1",
  measurementId: "G-L8XTVEQGR2"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export service instances for use in other parts of the app
export const auth = getAuth(app);
export const db = getFirestore(app);