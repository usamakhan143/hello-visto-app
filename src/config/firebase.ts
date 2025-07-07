import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8rYO9NaN8DF3nOr9xzAMTp-CqEyk6MZ8",
  authDomain: "hello-visto-1db35.firebaseapp.com",
  projectId: "hello-visto-1db35",
  storageBucket: "hello-visto-1db35.firebasestorage.app",
  messagingSenderId: "960992780025",
  appId: "1:960992780025:web:198e85f8dd4fcb0eed0c28",
  measurementId: "G-1LPHXDC3TB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

// Initialize Analytics (optional for mobile)
// export const analytics = getAnalytics(app);

export default app;
