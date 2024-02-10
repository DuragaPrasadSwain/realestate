// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
//   apiKey:import.meta.,
  authDomain: "estate-9396a.firebaseapp.com",
  projectId: "estate-9396a",
  storageBucket: "estate-9396a.appspot.com",
  messagingSenderId: "1072528411867",
  appId: "1:1072528411867:web:a75fe6cd7f9e0b90b3d0fe",
  measurementId: "G-FKW2CJSM5D"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);