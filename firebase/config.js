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
  apiKey: "AIzaSyAZxBQLBZUX2O1GVXd6XqhUJFkS3kq1-bk",
  authDomain: "aboutnativeapp.firebaseapp.com",
  projectId: "aboutnativeapp",
  storageBucket: "aboutnativeapp.appspot.com",
  messagingSenderId: "57556387913",
  appId: "1:57556387913:web:3d92993479ecd565fc1798",
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
