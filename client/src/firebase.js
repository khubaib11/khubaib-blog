// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-b6492.firebaseapp.com",
  projectId: "mern-blog-b6492",
  storageBucket: "mern-blog-b6492.firebasestorage.app",
  messagingSenderId: "679471237666",
  appId: "1:679471237666:web:105f2415320e65de0b587b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);