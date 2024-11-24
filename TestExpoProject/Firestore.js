// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhKeEKXIISzqOvVVSc8Z9HSjDest5M-kE",
  authDomain: "sutstore-343b3.firebaseapp.com",
  projectId: "sutstore-343b3",
  storageBucket: "sutstore-343b3.appspot.com",
  messagingSenderId: "225939684159",
  appId: "1:225939684159:web:decb3d2f0ce3bebaa6f18a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);
const storage = getStorage(app);
// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { db, auth,storage };