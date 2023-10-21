// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4-nNyomjDdCe1H-S9t7RzuYtbzDxGsA4",
  authDomain: "test-native-project-402621.firebaseapp.com",
  projectId: "test-native-project-402621",
  storageBucket: "test-native-project-402621.appspot.com",
  messagingSenderId: "867959236699",
  appId: "1:867959236699:web:ea230191b166b981c5377e",
  measurementId: "G-D0KYER75KD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);
